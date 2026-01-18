import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createUserProject,
  getUserCredits,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protect);
router.get("/credits", getUserCredits);
router.post("/projects", createUserProject);

export default router;
