import express from "express";
const router = express.Router();
import checkDataReclamacao from "../middlewares/checkDataReclamacoes.js";
import ReclamacoesController from "../controllers/ReclamacoesController.js";
import { authenticateJWT } from "../middlewares/authenticateJwt.js";

router.get(
  "/minhas-reclamacoes",
  authenticateJWT,
  ReclamacoesController.reclamacaoUsuario
);
// rotas proprias
router.get("/", authenticateJWT, ReclamacoesController.show);
router.get("/:id", authenticateJWT, ReclamacoesController.index);
router.post(
  "/criar",
  authenticateJWT,
  checkDataReclamacao,
  ReclamacoesController.store
);
router.put(
  "/editar/:id",
  authenticateJWT,
  ReclamacoesController.updateWithResponse
);

export default router;
