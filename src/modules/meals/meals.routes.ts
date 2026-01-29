import express, { Router } from "express";
import { mealsController } from "./meals.controller";

const router = express.Router();

router.post("/meals", mealsController.createMeal);

export const mealsRoter: Router = router;
