import { Request, Response } from "express";
import { orderService } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.createOrder(req.body);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};

const getOwnOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.getOwnOrders(user?.id as string);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

export const orderController = { createOrder, getOwnOrders };
