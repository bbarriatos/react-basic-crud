const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Schema = mongoose.Schema;

const TaskTypeSchema = new Schema({
  title: {
    type: String,
  },
  // slug: {
  //   type: String,
  // },
});

// PostSchema.plugin(URLSlugs('title', { field: 'slug' }));
module.exports = mongoose.model('tasktype', TaskTypeSchema);
