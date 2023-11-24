const mongoose = require('mongoose');

const connect = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI, {
  });
    console.log('database connected')
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;
