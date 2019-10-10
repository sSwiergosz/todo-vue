const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: new Date() 
  }
});

module.exports = mongoose.model('Tasks', TaskSchema); // Schema name & schema which should be used