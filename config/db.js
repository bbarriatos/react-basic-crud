const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/todo-app';

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');
    //   mongoose.connection
    //     .once('open', () => console.log('Connected'))
    //     .on('error', (err) => console.log(`Could not connect`, err));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
