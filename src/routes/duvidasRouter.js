import express from "express";
const router = express.Router();
import checkDataReclamacao from "../middlewares/checkDataReclamacoes.js";
import DuvidasController from "../controllers/DuvidasController.js";
import { authenticateJWT } from "../middlewares/authenticateJwt.js";
import checkRoleUser from "../middlewares/checkRoleUserInRoutePrivate.js";

router.get(
  "/minhas-duvidas",
  authenticateJWT,
  DuvidasController.duvidasUsuarios
);
router.get(
  "/duvidas-secretaria",
  authenticateJWT,
  checkRoleUser,
  DuvidasController.duvidasDaSecretaria
);
router.get(
  "/duvidas-sem-secretaria",
  authenticateJWT,
  checkRoleUser,
  DuvidasController.duvidasSemSecretaria
);
// rotas proprias
router.get("/", authenticateJWT, DuvidasController.show);
router.get("/:id", authenticateJWT, DuvidasController.index);
router.post(
  "/criar",
  authenticateJWT,
  checkDataReclamacao,
  DuvidasController.store
);
router.patch(
  "/editar/:id",
  authenticateJWT,
  checkRoleUser,
  DuvidasController.updateWithResponse
);

export default router;
