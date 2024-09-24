// /config/db.config.ts

import mongoose from 'mongoose';
import {
  dbHost,
  dbName,
  dbPassword,
  dbUser,
} from '@constants/env.constants.js';

// Load database configurations from environment variables
const dbConfig = {
  host: dbHost,
  name: dbName,
  user: dbUser,
  password: dbPassword,
};

const mongoURI = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}?retryWrites=true&w=majority`;

// Connect to the MongoDB database
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    logger.info(`Successfully connected to the database: ${dbConfig.name}`);
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1); // Exit process with failure
  }
};

// Disconnect from the database
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.warn('Disconnected from the database');
  } catch (error) {
    logger.error(`Error disconnecting from the database`, error);
  }
};
