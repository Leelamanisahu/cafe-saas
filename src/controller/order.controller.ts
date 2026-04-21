import { Request, Response } from "express";
import {
  createOrderService,
  getOrderByIdService,
  getOrdersService,
  updateOrderStatusService,
} from "../service/order.service.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await createOrderService(req.body, req.user!);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await getOrdersService(req.user!);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await getOrderByIdService(req.params.id as string, req.user!);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await updateOrderStatusService(
      req.params.id as string,
      req.body.status,
      req.user!,
    );
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
