import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@utils/jwt.util.js'; // Adjust the path as needed
import { handleError } from '@utils/response.util.js';

interface AuthenticatedRequest extends Request {
  user?: { userId: string; username: string }; // Adjust based on your payload structure
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleError(res, {
      status: 401,
      message: 'Authorization token required',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = verifyAccessToken(token) as any;

    if (!decoded) {
      return handleError(res, {
        status: 401,
        message: 'Invalid or expired token',
      });
    }

    // Attach user information to the request object
    req.user = { userId: decoded.userId, username: decoded.username };
  } catch (error) {
    return handleError(res, {
      status: 401,
      message: 'Invalid or expired token',
    });
  }
  next();
};

export default authMiddleware;
