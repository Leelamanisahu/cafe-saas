import express, { Request, Response } from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as OpenApiValidator from "express-openapi-validator";

import authRouter from "./router/auth.router.js";
import cafeRouter from "./router/cafe.router.js";
import staffRouter from "./router/staff.router.js";
import menuRouter from "./router/menu.router.js";
import orderRouter from "./router/order.router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "../src/api/cafe-api.yaml"),
    validateRequests: true,
    fileUploader: false,
    ignorePaths: /^\/api\/menu/,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/cafe", cafeRouter);
app.use("/api/staff", staffRouter);
app.use("/api/menu", menuRouter);
app.use("/api/orders", orderRouter);

app.use((err: any, req: any, res: any, next: any) => {
  // OpenAPI validation errors
  if (err.status && err.errors) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      errors: err.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // General errors
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
