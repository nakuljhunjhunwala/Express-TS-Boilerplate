import { Request, Response, NextFunction } from 'express';

const apiWatcher = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime(); // Start time for response time calculation

  // Extract request details
  const { method, url, headers, body } = req;
  logger.info('Incoming Request', {
    method,
    url,
    // headers,
    // body: JSON.stringify(body),
  });

  // Capture response details
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1e9 + nanoseconds) / 1e6; // Response time in milliseconds

    const { statusCode } = res;
    const responseDetails = {
      statusCode,
      duration: `${duration.toFixed(3)} ms`,
    };

    // Log the response details along with status code and duration
    logger.info('Outgoing Response', responseDetails);
  });

  next(); // Pass control to the next middleware or route handler
};

export default apiWatcher;
