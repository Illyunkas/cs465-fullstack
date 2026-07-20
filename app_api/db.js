var mongoose = require('mongoose');

var dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

var connect = async function() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB at ' + dbURI);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = {
  connect: connect,
};
