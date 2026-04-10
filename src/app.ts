import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import cafeRouter from "./router/cafe.router";
import staffRouter from "./router/staff.router";
import menuRouter from "./router/menu.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cafe", cafeRouter);
app.use("/api/staff", staffRouter);
app.use("/api/menu", menuRouter);

export default app;
