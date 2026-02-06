import { Request, Response } from "express";
import { mealsService } from "./meals.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await mealsService.createMeal(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await mealsService.updateMeal(id as string, req.body);
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Updated Successfully" },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await mealsService.deleteMeal(id as string);
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Deleted Successfully" },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: { error: err, message: "delete Operation Unsuccessfull" },
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await mealsService.updateOrderStatus(id as string, req.body);
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Updated Successfully" },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: { error: err, message: "Order Update Unsuccessfull" },
    });
  }
};

export const mealsController = {
  createMeal,
  updateMeal,
  deleteMeal,
  updateOrderStatus,
};
