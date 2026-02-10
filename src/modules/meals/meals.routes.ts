import express, { Router } from "express";
import { mealsController } from "./meals.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get(
  "/meals/orders",
  auth(UserRole.PROVIDER),
  mealsController.viewIncomingOrders,
);

router.post("/meals", auth(UserRole.PROVIDER), mealsController.createMeal);


router.put("/meals/:id", auth(UserRole.PROVIDER), mealsController.updateMeal);

router.delete(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  mealsController.deleteMeal,
);

router.patch(
  "/orders/:id",
  auth(UserRole.PROVIDER),
  mealsController.updateOrderStatus,
);

export const mealsRoter: Router = router;
