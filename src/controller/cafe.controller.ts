import { Request, Response } from "express";
import { createCafeService } from "../service/cafe.service.js";

export const createCafe = async (req: Request, res: Response) => {
  try {
    const cafe = await createCafeService(req.body, req.user!);
    res.status(201).json(cafe);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
