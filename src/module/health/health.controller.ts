import { Request, Response, Router } from 'express';
import os from 'os';

const router = Router();

// Health Check Route
router.get('/health', (req: Request, res: Response) => {
  const healthStatus = {
    status: 'OK',
    uptime: process.uptime(),
    uptimeUnit: 'seconds',
    timestamp: Date.now(),
    memoryUsage: process.memoryUsage(),
    platform: os.platform(),
    release: os.release(),
    cpuCount: os.cpus().length,
  };

  res.status(200).json(healthStatus);
});

export default router;
