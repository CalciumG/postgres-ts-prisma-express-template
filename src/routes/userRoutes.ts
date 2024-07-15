import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.post("/users", addUser);

export default router;
