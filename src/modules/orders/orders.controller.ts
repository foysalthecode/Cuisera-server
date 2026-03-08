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

const deleteOwnOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const orderId = req?.params?.id as string;
    const result = await orderService.deleteOwnOrder(
      user?.id as string,
      orderId,
    );
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Order Delete Failed";
    return res.status(403).json({
      success: false,
      message: { error: errorMessage, message: err },
    });
  }
};

export const orderController = { createOrder, getOwnOrders, deleteOwnOrder };
