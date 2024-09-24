// src/middleware/validate.ts
import { handleError } from '@utils/response.util.js';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateRequest<T>(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dtoObj);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      return handleError(res, messages);
    } else {
      req.body = dtoObj; // if validation passes, replace body with the validated object
      next();
    }
  };
}
