import express from "express";
const router = express.Router();
import checkDataReclamacao from "../middlewares/checkDataReclamacoes.js";
import ReclamacoesController from "../controllers/ReclamacoesController.js";

router.get("/minhas-reclamacoes", ReclamacoesController.reclamacaoUsuario);
// rotas proprias
router.get("/", ReclamacoesController.show);
router.get("/:id", ReclamacoesController.index);
router.post("/criar", checkDataReclamacao, ReclamacoesController.store);
router.put("/editar/:id", ReclamacoesController.updateWithResponse);

export default router;
