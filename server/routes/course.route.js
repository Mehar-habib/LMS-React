import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse } from "../controllers/course.controller.js";

const router = Router();

router.route("/").post(isAuthenticated, createCourse);

export default router;
