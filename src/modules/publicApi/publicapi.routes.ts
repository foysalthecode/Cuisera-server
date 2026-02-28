import express, { Router } from "express";
import { publicApiController } from "./publicApi.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/meals", publicApiController.getAllMeal);

router.get("/meals/:id", publicApiController.getSingleMeal);

router.get("/providers", publicApiController.getAllProviders);

router.get("/providers/:id", publicApiController.getSingleProvider);

router.get(
  "/cart",
  auth(UserRole.USER, UserRole.PROVIDER),
  publicApiController.getCart,
);

router.post(
  "/cart",
  auth(UserRole.USER, UserRole.PROVIDER),
  publicApiController.addMealsToCart,
);

router.delete(
  "/cart/:cartId",
  auth(UserRole.USER),
  publicApiController.deleteFromCart,
);

export const PublicApirouter: Router = router;
