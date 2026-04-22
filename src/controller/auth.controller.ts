import { Request, Response } from "express";

import { loginUser, registerAdmin } from "../service/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerAdmin(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
