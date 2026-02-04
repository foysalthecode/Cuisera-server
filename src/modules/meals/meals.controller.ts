import { Request, Response } from "express";
import { mealsService } from "./meals.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await mealsService.createMeal(req.body);
    res.status(201).json(result);
  } catch (err) {
    return res.status(201).json(err);
  }
};

export const mealsController = { createMeal };
