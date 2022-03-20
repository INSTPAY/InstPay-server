const mongoose = require('mongoose');

const otpSceama = mongoose.Schema(
  {
    payload: { type: String, require: true },
    otp: { type: String, require: true },
    expireAt: {
      type: Date,
      default: Date.now(),
      expires: 600,
    },
  },

  { timestamps: true }
);

otpSceama.index({ expireAt: 1 }, { expireAfterSeconds: 5 });

module.exports = mongoose.model('Otp', otpSceama);
