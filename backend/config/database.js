const mongoose = require('mongoose');
// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/healnow';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('[Database] MongoDB connected successfully');
    return true;
  } catch (error) {
    console.log('[Database Error]', error.message);
    return false;
  }
};

module.exports = { connectDB };
