import CustomError from "@utils/CustomError";
import { NextFunction, Request, Response } from "express";


const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack trace for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  if (process.env.NODE_ENV === 'development') {
    // In development, send detailed error information
    res.status(statusCode).json({
      success: false,
      message: message,
      stack: err.stack, // Include stack trace
    });
  } else {
    // In production, do not send stack trace to clients
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

export { errorHandler };
