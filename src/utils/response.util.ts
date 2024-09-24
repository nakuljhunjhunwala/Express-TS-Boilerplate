import { Response } from 'express';

interface SuccessResponse<T = any> {
  status?: number;
  data?: T;
  message?: string;
}

interface ErrorResponse {
  statusCode?: number;
  error?: {
    description?: string;
  };
  message?: string;
  status?: number;
}

function handleSuccess<T>(
  res: Response,
  result: SuccessResponse<T> | T, // Accept single data as result
) {
  let responseData: { success: boolean; message: string; data?: T };
  const defaultMessage = 'Operation successful';

  if (
    typeof result === 'object' &&
    result !== null &&
    (result as any)?.status
  ) {
    const {
      status = 200,
      data,
      message = defaultMessage,
    } = result as SuccessResponse<T>;

    responseData = {
      success: true,
      message,
      ...(data !== undefined ? { data } : {}),
    };

    res.status(status).json(responseData);
  } else {
    // If result is not an object, consider it as single data
    responseData = {
      success: true,
      message: defaultMessage,
      data: result as T,
    };

    res.status(200).json(responseData);
  }
}

function handleError(res: Response, error: ErrorResponse | string | any) {
  let errorMessage: string;
  let errorStatus: number = 500;

  // Handle structured error with statusCode and error object
  if (error.statusCode && error.error) {
    errorStatus = error.statusCode;
    errorMessage = error.error.description || 'An error occurred';
  }
  // Handle MongoDB errors
  else if (error.code) {
    errorStatus = 400; // Bad Request for general MongoDB errors
    errorMessage = error.errmsg || 'A database error occurred';
  }
  // Handle class validation errors (e.g., from class-validator)
  else if (error.errors) {
    errorStatus = 400; // Bad Request for validation errors
    errorMessage =
      error.errors.map((err: { message: string }) => err.message).join(', ') ||
      'Validation failed';
  }
  // Handle string errors
  else if (typeof error === 'string') {
    errorMessage = error;
  }
  // Handle errors with a message property
  else if (error.message) {
    errorMessage = error.message;
    if (error.status) {
      errorStatus = error.status;
    }
  }
  // Handle array of errors
  else if (Array.isArray(error)) {
    errorMessage = error.map((err) => err.message || err).join(', ');
    errorStatus = 400; // Bad Request for validation errors
  }
  // Fallback for unknown error types
  else {
    errorMessage = 'An unknown error occurred';
  }

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    error: error, // Exclude detailed error information
  });
}

export { handleSuccess, handleError };
