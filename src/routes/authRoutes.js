import express from "express";
const router = express.Router();
import AuthController from "../controllers/AuthUserController.js";

router.post("/", AuthController.login);
router.delete("/logout", AuthController.logout);

export default router;
