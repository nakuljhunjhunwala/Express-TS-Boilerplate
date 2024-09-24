import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export function generateDeviceIdMiddleware(options: any = {}) {
  const {
    headerNames = ['device-id', 'x-device-id'],
    fallbackGenerator = () => randomUUID(),
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    let deviceId = null;

    for (const headerName of headerNames) {
      const headerValue = req.headers[headerName];
      if (headerValue) {
        deviceId = headerValue;
        break;
      }
    }

    if (!deviceId) {
      deviceId = fallbackGenerator();
    }

    req.deviceId = deviceId;

    res.setHeader('x-device-id', deviceId);
    res.setHeader('device-id', deviceId);
    next();
  };
}
