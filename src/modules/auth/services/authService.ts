import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByUsername } from "./userService";

const JWT_SECRET = process.env.JWT_SECRET ?? "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? "your_refresh_secret";
const JWT_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export const authenticateUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  }
  return null;
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const refreshAccessToken = (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, REFRESH_SECRET);
  if (decoded?.userId) {
    const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return newAccessToken;
  }
  return null;
};
