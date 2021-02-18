const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../model/User');

router.get('/', auth, async (req, res) => {
  try {
    // .select() so that it wont return the 'password' property
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route POST api/auth
// Authenticate User and Get token
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let checkEmail = await User.findOne({ email });

      // See if User exists
      if (!checkEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, checkEmail.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jwt

      const payload = {
        user: {
          id: checkEmail.id, // mongoose uses abstration to make _id into id
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
