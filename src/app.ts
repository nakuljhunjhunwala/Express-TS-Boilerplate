// /src/app.ts

import express from 'express';
import { logger } from './logger/logger.js';
import healthRoute from '@module/health/health.controller.js';
import userRoute from '@module/user/user.route.js';
import authRoute from '@module/authentication/auth.route.js';
import apiWatcher from './middleware/api-watcher.middleware.js';
import { generateDeviceIdMiddleware } from './middleware/deviceId-generator.middleware.js';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(apiWatcher);
const deviceIDGenerator = generateDeviceIdMiddleware();
app.use(deviceIDGenerator);

// Sample route
app.get('/', (req, res) => {
  logger.info('Root route accessed');
  res.send('Welcome to the Express TypeScript App!');
});
// Register health check route
app.use('/api', healthRoute);
app.use('/api', authRoute);
app.use('/api/user', userRoute);

export default app;
