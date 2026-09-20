import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined in .env');
    }

    // Ensure reliable SRV DNS resolution on Windows environments
    if (mongoUri.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
      } catch (dnsErr) {
        console.warn('[MongoDB DNS Warning]: Could not set custom DNS servers', dnsErr.message);
      }
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host} / Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};
