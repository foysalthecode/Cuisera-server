import { Request, Response } from "express";
import { publicApiService } from "./publicApi.service";
import paginationSortingHelper from "../../helper/paginationSortinghelper";

const getAllMeal = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const { page, limit, skip, sortOrder } = paginationSortingHelper(req.query);

    const result = await publicApiService.getAllMeal({
      search: searchString,
      sortOrder,
      page,
      limit,
      skip,
    });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Couldn't Retrive any data" },
    });
  }
};

const getSingleMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleMeal(id as string);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Coundn't find any data" },
    });
  }
};

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await publicApiService.getAllProviders();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Coundn't find any data" },
    });
  }
};

const getSingleProvider = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleProvider(id as string);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: { error: err, data: "Coundn't find any data" },
    });
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await publicApiService.getCart(id as string);
    return res.status(200).json({
      success: true,
      data: result,
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
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const id = req.user?.id;
    const result = await publicApiService.deleteFromCart(cartId as string,id as string);
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

export const publicApiController = {
  getAllMeal,
  getSingleMeal,
  getAllProviders,
  getSingleProvider,
  getCart,
  addMealsToCart,
  deleteFromCart,
};
