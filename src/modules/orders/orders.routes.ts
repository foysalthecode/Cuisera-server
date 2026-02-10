import express, { Router } from "express";
import { orderController } from "./orders.controller";

const router = express.Router();

// router.get("/",)

router.post("/", orderController.createOrder);

export const orderRouter: Router = router;
