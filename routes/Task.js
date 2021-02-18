const express = require('express');
const Task = require('../model/Task');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const task = await Task.find();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task === null) {
      return res.status(400).send('Post not found');
    }

    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, check('title', 'Required'), check('description', 'Required')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description, status } = req.body;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await new Task({
        title,
        description,
        status,
      });

      await task.save();

      res.json(task);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/:id',
  [auth, check('title', 'Required'), check('description', 'Required')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description } = req.body;
      const task = await Task.findById(req.params.id);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      task.title = title;
      task.description = description;
      await task.save();

      res.json(task);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    await task.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
