import express from "express";
const router = express.Router();
import AuthController from "../controllers/AuthUserController.js";

router.post("/", AuthController.login);

export default router;
