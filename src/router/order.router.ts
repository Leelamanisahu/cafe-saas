import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth.js";
import {
  createOrder,
  getOrder,
  getOrderById,
  updateOrderStatus,
} from "../controller/order.controller.js";

const orderRouter = Router();

orderRouter
  .post("/", authMiddleware, allowRoles("ADMIN", "STAFF"), createOrder)
  .get("/", authMiddleware, allowRoles("ADMIN", "STAFF"), getOrder)
  .get("/:id", authMiddleware, allowRoles("ADMIN", "STAFF"), getOrderById)
  .patch(
    "/:id",
    authMiddleware,
    allowRoles("ADMIN", "STAFF"),
    updateOrderStatus,
  );

export default orderRouter;
