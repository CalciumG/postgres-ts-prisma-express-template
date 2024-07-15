import { Request, Response } from "express";
import { getAllUsers, createUser, deleteUser } from "../services/userService";
import { validateAndParse } from "../utils/validateAndParseRequest";
import { NewUserSchema } from "../models/userSchema";

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

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteUser(parseInt(id, 10));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
