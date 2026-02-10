import { Request, Response } from "express";
import { adminControllService } from "./adminControll.service";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await adminControllService.getAllOrders();
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminControllService.getAllUsers();
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

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminControllService.updateUserStatus(
      id as string,
      req.body,
    );
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Successfull Updated Status" },
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

export const adminControllController = {
  getAllOrders,
  getAllUsers,
  updateUserStatus,
};
