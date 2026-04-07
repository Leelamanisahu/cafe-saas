import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

export default app;
