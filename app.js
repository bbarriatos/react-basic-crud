const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

// Initialize Middleware
app.use(express.json({ extended: false }));

// Connect to Database
connectDB();

// Use Routes
app.use('/api/users', require('./routes/User'));
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/task', require('./routes/Task'));
app.use('/api/category', require('./routes/TaskType'));

app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
