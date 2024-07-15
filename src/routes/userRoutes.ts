import { Router } from "express";
import { getUsers, addUser, removeUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users/:id", removeUser);

export default router;
