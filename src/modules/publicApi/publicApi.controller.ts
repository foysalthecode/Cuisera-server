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

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await publicApiService.getAllProviders();
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

const getSingleProvider = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleProvider(id as string);
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

const addMealsToCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).json({
        message: "Unauthorizes access. Login to continue",
      });
    }
    const result = await publicApiService.addMealsToCart(req.body);
    return res.status(201).json({
      success: true,
      data: { resutl: result, message: "Added to Cart" },
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

export const publicApiController = {
  getAllMeal,
  getSingleMeal,
  getAllProviders,
  getSingleProvider,
  addMealsToCart,
};
