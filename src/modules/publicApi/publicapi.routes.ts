import express, { Router } from "express";
import { publicApiController } from "./publicApi.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/meals", publicApiController.getAllMeal);

router.get("/meals/:id", publicApiController.getSingleMeal);

router.get("/providers", publicApiController.getAllProviders);

router.get("/providers/:id", publicApiController.getSingleProvider);

router.post("/cart", auth(UserRole.USER), publicApiController.addMealsToCart);

export const PublicApirouter: Router = router;
