import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth";
import { createCafe } from "../controller/cafe.controller";

const cafeRouter = Router();

cafeRouter.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  createCafe,
);

export default cafeRouter;
