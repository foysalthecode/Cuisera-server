import { Request, Response } from "express";
import { publicApiService } from "./publicApi.service";

const getAllMeal = async (req: Request, res: Response) => {
  try {
    const result = await publicApiService.getAllMeal();
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

const getSingleMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleMeal(id as string);
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: { error: err, data: "Coundn't find any data" },
    });
  }
};

export const publicApiController = { getAllMeal, getSingleMeal };
