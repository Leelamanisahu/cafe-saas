import { Router } from "express";
import { allowRoles, authMiddleware } from "../middleware/auth.js";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenuWithCategory,
  updateMenu,
} from "../controller/menu.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const menuRouter = Router();

// PUBLIC → get menu (QR)
menuRouter.get("/:cafeId", getMenu);
menuRouter.get("/:cafeId/:category", getMenuWithCategory);

// ADMIN → create menu
menuRouter.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  upload.single("imageUrl"),
  createMenu,
);

// ADMIN → update menu
menuRouter.patch("/:id", authMiddleware, allowRoles("ADMIN"), updateMenu);

// ADMIN → delete menu
menuRouter.delete("/:id", authMiddleware, allowRoles("ADMIN"), deleteMenu);

export default menuRouter;
