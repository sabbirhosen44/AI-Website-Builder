import ErrorResponse from "../utils/errorResponse.util.js";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Server Error";

  if (err instanceof ErrorResponse) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (process.env.NODE_ENV === "developement") {
    console.log("Error: ", err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;
