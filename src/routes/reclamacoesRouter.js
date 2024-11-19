import express from "express";
const router = express.Router();
import checkDatas from "../middlewares/checkDataUserCreate.js";
import checkUser from "../middlewares/checkUserExist.js";
import ReclamacoesController from "../controllers/ReclamacoesController.js";

router.post("/criar", ReclamacoesController.store);

export default router;
