const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/instPay');
    console.log('db connected');
  } catch (error) {
    throw error;
  }
};

module.exports = connectdb;
