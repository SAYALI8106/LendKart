import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async (retryCount = 0) => {
  const maxRetries = 5;
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('[MongoDB Error]: MONGO_URI environment variable is not defined in .env');
    return;
  }

  // Ensure reliable SRV DNS resolution on Windows environments
  if (mongoUri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    } catch (dnsErr) {
      console.warn('[MongoDB DNS Warning]: Could not set custom DNS servers:', dnsErr.message);
    }
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4 // Force IPv4
    });

    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host} / Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection attempt ${retryCount + 1} failed: ${error.message}`);

    if (retryCount < maxRetries) {
      const waitTime = Math.min(10000, 2000 * Math.pow(1.5, retryCount));
      console.log(`[MongoDB Retry] Retrying connection in ${(waitTime / 1000).toFixed(1)}s...`);
      setTimeout(() => connectDB(retryCount + 1), waitTime);
    } else {
      console.error('[MongoDB Critical] Max connection retries reached. Server running with degraded DB access.');
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Warning] Disconnected from database. Attempting reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB Event Error]:', err.message);
});
