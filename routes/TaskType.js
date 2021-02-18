const express = require('express');
const TaskType = require('../model/TaskType');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const taskType = await TaskType.find();
    res.json(taskType);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const taskType = await TaskType.findById(req.params.id);
    res.json(taskType);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', [auth, check('title', 'Required')], async (req, res) => {
  try {
    const errors = validationResult(req);
    const { title } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await new TaskType({
      title,
    });

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    const { title } = req.body;
    const category = await TaskType.findById(req.params.id);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    category.title = title;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await TaskType.findById(req.params.id);

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
