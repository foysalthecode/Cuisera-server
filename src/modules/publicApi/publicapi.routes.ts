import express, { Router } from "express";
import { publicApiController } from "./publicApi.controller";

const router = express.Router();

router.get("/meals", publicApiController.getAllMeal);

router.get("/meals/:id", publicApiController.getSingleMeal);

router.get("/providers", publicApiController.getAllProviders);

router.get("/providers/:id",publicApiController.getSingleProvider)

export const PublicApirouter: Router = router;
