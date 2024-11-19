import express from "express";
const router = express.Router();
import checkDatas from "../middlewares/checkDataUserCreate.js";
import checkUser from "../middlewares/checkUserExist.js";
import UserController from "../controllers/Users.js";

router.post("/criar", checkDatas, checkUser, UserController.store);

export default router;
