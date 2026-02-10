import express, { Router } from "express";
import { orderController } from "./orders.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/allOrders", auth(UserRole.ADMIN), orderController.getAllOrders);

router.get("/", auth(UserRole.USER), orderController.getOwnOrders);

router.post("/", orderController.createOrder);

export const orderRouter: Router = router;
