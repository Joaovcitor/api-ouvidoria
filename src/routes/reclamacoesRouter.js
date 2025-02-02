import express from "express";
const router = express.Router();
import checkDataReclamacao from "../middlewares/checkDataReclamacoes.js";
import ReclamacoesController from "../controllers/ReclamacoesController.js";
import { authenticateJWT } from "../middlewares/authenticateJwt.js";
import checkRoleUser from "../middlewares/checkRoleUserInRoutePrivate.js";
// import { upload } from "../config/multerConfig.js";

router.get(
  "/minhas-reclamacoes",
  authenticateJWT,
  ReclamacoesController.reclamacaoUsuario
);
router.get(
  "/reclamacoes-secretaria",
  authenticateJWT,
  checkRoleUser,
  ReclamacoesController.reclamacaoDaSecretaria
);
router.get(
  "/reclamacoes-sem-secretaria",
  authenticateJWT,
  checkRoleUser,
  ReclamacoesController.reclamacaoSemSecretaria
);
// rotas proprias
router.get("/", authenticateJWT, ReclamacoesController.show);
router.get("/:id", authenticateJWT, ReclamacoesController.index);
router.post(
  "/criar",
  authenticateJWT,
  // upload.single("Fotos"),
  ReclamacoesController.store
);
router.patch(
  "/editar/:id",
  authenticateJWT,
  checkRoleUser,
  ReclamacoesController.updateWithResponse
);

export default router;
