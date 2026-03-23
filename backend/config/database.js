const mongoose = require('mongoose');
// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://shaffernisha96_db_user:SanaYusra0502@cluster0.fqtdoww.mongodb.net/healnow?appName=Cluster0';
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
