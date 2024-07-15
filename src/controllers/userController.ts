import { Request, Response } from "express";
import { getAllUsers, createUser } from "../services/userService";
import { NewUserSchema } from "../schemas/userSchema";
import { validateAndParse } from "../utils/validateAndParseRequest";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewUserSchema, req);
    const newUser = await createUser(parsed.username);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
