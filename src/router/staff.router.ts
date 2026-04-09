import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth";
import {
  createStaff,
  deleteStaff,
  getStaff,
} from "../controller/staff.controller";

const staffRouter = Router();

staffRouter
  .post("/", authMiddleware, allowRoles("ADMIN"), createStaff)
  .get("/", authMiddleware, allowRoles("ADMIN"), getStaff)
  .delete("/:id", authMiddleware, allowRoles("ADMIN"), deleteStaff);

export default staffRouter;
