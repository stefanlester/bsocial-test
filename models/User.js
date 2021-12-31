const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    }
}
});

module.exports = model('User', userSchema);
