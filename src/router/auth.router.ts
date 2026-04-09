import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import { allowRoles, authMiddleware } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
