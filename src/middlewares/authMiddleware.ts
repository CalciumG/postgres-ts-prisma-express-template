import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../modules/auth/services/authService";

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
