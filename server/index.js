const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors'); 
const app = express();
const userRoute = require('./Routes/UserRoute')
const TaskRoute = require('./Routes/TaskRoute')
const bodyParser = require('body-parser');
const Buffer = require('buffer').Buffer;

// Middleware
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());
app.use('/User',userRoute);
app.use('/Task',TaskRoute);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


// Import Models
const User = require('./Models/user');
const Task = require('./Models/task');

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
