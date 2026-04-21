import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth.js";
import {
  createStaff,
  deleteStaff,
  getStaff,
} from "../controller/staff.controller.js";

const staffRouter = Router();

staffRouter
  .post("/", authMiddleware, allowRoles("ADMIN"), createStaff)
  .get("/", authMiddleware, allowRoles("ADMIN"), getStaff)
  .delete("/:id", authMiddleware, allowRoles("ADMIN"), deleteStaff);

export default staffRouter;
