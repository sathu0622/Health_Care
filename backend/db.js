// db.js
const mongoose = require('mongoose');

let dbInstance = null;

const connectToDatabase = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    dbInstance = db;
    return dbInstance;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

module.exports = connectToDatabase;
