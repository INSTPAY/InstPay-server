const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('db connected');
  } catch (error) {
    throw error;
  }
};

module.exports = connectdb;
