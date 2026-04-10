import { Request, Response } from "express";
import {
  createMenuService,
  deleteMenuService,
  getMenuService,
  getMenuWithCatService,
  updateMenuService,
} from "../service/menu.service";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file?.path;
    const menu = await createMenuService(
      {
        ...req.body,
        imageUrl,
      },
      req.user!,
    );

    res.status(201).json(menu);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await getMenuService(req.params.id as string);
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMenuWithCategory = async (req: Request, res: Response) => {
  try {
    const menu = await getMenuWithCatService(
      req.params.id as string,
      req.params.category as string,
    );
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenu = async (req: any, res: Response) => {
  try {
    const menu = await updateMenuService(req.params.id, req.body, req.user);
    res.json(menu);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenu = async (req: any, res: Response) => {
  try {
    const result = await deleteMenuService(req.params.id, req.user);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
