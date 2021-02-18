const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'Ongoing',
  },
  // slug: {
  //   type: String,
  // },
});

// TaskSchema.plugin(URLSlugs('title', { field: 'slug' }));
module.exports = mongoose.model('task', TaskSchema);
