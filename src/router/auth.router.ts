import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import { allowRoles, authMiddleware } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get(
  "/user",
  authMiddleware,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  async (req, res, next) => {
    console.log("hello");
  },
);

export default authRouter;
