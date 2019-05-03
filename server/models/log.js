const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Log', LogSchema);
