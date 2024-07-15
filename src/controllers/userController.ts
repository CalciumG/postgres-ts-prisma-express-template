import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

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
    const { username } = req.body;
    const newUser = await createUser(username);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
