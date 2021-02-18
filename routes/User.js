const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.send('express js');
});

// @route POST api/users
// Register User
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').not().isEmpty().isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let checkEmail = await User.findOne({ email: email });

      // See if User exists
      if (checkEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const user = await new User({ email, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return jwt

      const payload = {
        user: {
          id: user.id, // mongoose uses abstration to make _id into id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
