import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth.js";
import { createCafe } from "../controller/cafe.controller.js";

const cafeRouter = Router();

cafeRouter.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  createCafe,
);

export default cafeRouter;
