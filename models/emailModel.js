const mongoose = require('mongoose');

const emailSceama = mongoose.Schema(
  {
    email: { type: String, require: true },
  },

  { timestamps: true }
);
module.exports = mongoose.model('Email', emailSceama);
