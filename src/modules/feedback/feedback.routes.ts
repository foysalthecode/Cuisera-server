import expres, { Router } from "express";
import { feedBackController } from "./feedback.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = expres.Router();

router.post("/", auth(UserRole.USER), feedBackController.createFeedBack);

router.delete("/:id", auth(UserRole.USER), feedBackController.deleteFeedBack);

export const feedBackRouter: Router = router;
