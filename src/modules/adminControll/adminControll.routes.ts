import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { adminControllController } from "./adminControll.controller";

const router = express.Router();

router.get(
  "/allorders",
  auth(UserRole.ADMIN),
  adminControllController.getAllOrders,
);

router.get(
  "/allusers",
  auth(UserRole.ADMIN),
  adminControllController.getAllUsers,
);

router.patch(
  "/status/:id",
  auth(UserRole.ADMIN),
  adminControllController.updateUserStatus,
);

export const adminControllRouter: Router = router;
