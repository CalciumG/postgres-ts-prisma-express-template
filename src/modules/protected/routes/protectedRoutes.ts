import { Router, Response } from "express";
import {
  authMiddleware,
  AuthenticatedRequest,
} from "../../../middlewares/authMiddleware";

const router = Router();

// this is just an example
router.get(
  "/protected",
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

export default router;
