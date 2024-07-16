import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(
    token,
    process.env.JWT_SECRET ?? "your_secret_key"
  );

  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = decoded;
  next();
};
