import { Request, Response } from "express";

import { createUser } from "../services/userService";
import { validateAndParse } from "../../../utils/validateAndParseRequest";
import { NewUserSchema } from "../models/User/userSchema";
import { authenticateUser, refreshAccessToken } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const tokens = await authenticateUser(username, password);
  if (tokens) {
    res.json(tokens);
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewUserSchema, req);
    const newUser = await createUser(parsed.username, parsed.password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const newAccessToken = refreshAccessToken(refreshToken);
  if (newAccessToken) {
    res.json({ accessToken: newAccessToken });
  } else {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};
