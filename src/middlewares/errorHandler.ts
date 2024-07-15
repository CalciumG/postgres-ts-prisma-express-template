import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/validateAndParseRequest";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ error: err.error, message: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};
