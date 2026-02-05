import express, { Router } from "express";
import { mealsController } from "./meals.controller";

const router = express.Router();

router.post("/meals", mealsController.createMeal);

router.put("/meals/:id", mealsController.updateMeal);

router.delete("/meals/:id", mealsController.deleteMeal);

export const mealsRoter: Router = router;
