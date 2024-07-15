import { Request } from "express";
import { AnyZodObject, z } from "zod";
export { z };

export class ValidationError extends Error {
  public statusCode: number;
  public error: string;
  public message: any;

  constructor(statusCode: number, error: string, message: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export async function validateAndParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  const result = await schema.safeParseAsync(req.body);
  if (!result.success) {
    throw new ValidationError(400, "Bad Request", result.error.errors);
  }
  return result.data;
}
