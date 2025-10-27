import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/logout").get(logout);

export default router;
