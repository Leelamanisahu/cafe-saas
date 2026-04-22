import { Request, Response } from "express";

import {
  createStaffService,
  deleteStaffService,
  getStaffService,
} from "../service/staff.service.js";

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff = await createStaffService(req.body, req.user!);
    res.status(201).json(staff);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getStaff = async (req: Request, res: Response) => {
  try {
    const staff = await getStaffService(req.user!);
    res.status(200).json(staff);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const result = await deleteStaffService(req.params.id as string, req.user!);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
