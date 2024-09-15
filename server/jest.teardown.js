const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Give time for all connections to close
};