import express from "express";
const router = express.Router();
import HomeController from "../controllers/HomeController.js";
import { authenticateJWT } from "../middlewares/authenticateJwt.js";

router.get("/", authenticateJWT, HomeController.home);

export default router;
