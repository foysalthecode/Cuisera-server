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
    return res.status(201).json(result);
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
    return res.status(201).json({
      success: true,
      data: { result: result, message: "Deleted Successfully" },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: { error: err, message: "couldn't Successfully" },
    });
  }
};

export const mealsController = { createMeal, updateMeal, deleteMeal };
