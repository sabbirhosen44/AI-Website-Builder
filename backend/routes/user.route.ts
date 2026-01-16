import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getUserCredits } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/credits", protect, getUserCredits);

export default router;
