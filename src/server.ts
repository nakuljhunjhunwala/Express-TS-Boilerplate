import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from '@config/db.config.js';
import { port } from '@constants/env.constants.js';
dotenv.config();

logger.info('Logger is working'); // Add this line to see if it compiles

const PORT = port || 3000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    logger.info('Database connected successfully');

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

startServer();
