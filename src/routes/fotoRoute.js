import express from "express";
const router = express.Router();
import FotoController from "../controllers/FotoController.js";

router.post("/", FotoController.store);

export default router;
