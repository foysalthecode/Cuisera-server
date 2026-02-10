import { Request, Response } from "express";
import { mealsService } from "./meals.service";
import { UserRole } from "../../middleware/auth";

const createMeal = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found,login to procced");
    }
    const isProvider = user?.role === UserRole.PROVIDER;
    const result = await mealsService.createMeal(req.body, isProvider);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    const erroMessage =
      err instanceof Error ? err.message : "Couldn't Create Meal";
    return res.status(400).json({
      success: false,
      data: { error: erroMessage, message: err },
    });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unable to update.Login to Procced");
    }
    const { id } = req.params;
    const result = await mealsService.updateMeal(
      id as string,
      req.body,
      user.id,
    );
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Updated Successfully" },
    });
  } catch (err) {
    const erroMessage =
      err instanceof Error ? err.message : "Meal Update Failed";
    return res.status(400).json({
      success: false,
      data: { error: erroMessage, message: err },
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await mealsService.deleteMeal(
      id as string,
      user?.id as string,
    );
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Deleted Successfully" },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Meal Delete Failed";
    return res.status(400).json({
      success: false,
      data: { error: errorMessage, message: err },
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await mealsService.updateOrderStatus(
      id as string,
      req.body,
      user?.id as string,
    );
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Updated Successfully" },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Status Update Unsuccessfull";
    return res.status(400).json({
      success: false,
      data: { error: errorMessage, message: err },
    });
  }
};

const viewIncomingOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await mealsService.viewIncomingOrders(user?.id as string);
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Order Retirve Successfully" },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unathorized access";

    return res.status(403).json({
      success: false,
      data: { error: errorMessage, messsage: err },
    });
  }
};

export const mealsController = {
  createMeal,
  updateMeal,
  deleteMeal,
  updateOrderStatus,
  viewIncomingOrders,
};
