const mongoose = require('mongoose');

const userSceama = mongoose.Schema(
  {
    _id: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    aadhaar: { type: String, default: '' },
    pan: { type: String, default: '' },
    photo: { type: String, default: '' },
    dob: { type: String, require: '' },
    address: { type: String, default: '' },
    phone: { type: String, require: true },
    account: { type: String, require: true },
    pin: { type: String, require: true },
    balance: { type: String, default: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSceama);
