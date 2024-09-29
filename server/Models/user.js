const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
