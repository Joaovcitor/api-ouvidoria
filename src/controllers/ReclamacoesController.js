import Reclamacoes from "../db/models/Reclamacoes.js";

class ReclamacoesController {
  async store(req, res) {
    const { descricao, status, secretariaResponsavel } = req.body;
    const userId = req.session.userId;
    try {
      const reclamacaoCriada = {
        descricao: descricao,
        status: status || "pendente",
        secretariaResponsavel: secretariaResponsavel,
        userId: userId
      }

      await Reclamacoes.create(reclamacaoCriada);

      res.status(200).json({ success: ["Reclamação criada com sucesso!"] })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: ["Ocorreu um erro desconhecido ao criar sua reclamação! Tente novamente"] })
    }
  }
}

export default new ReclamacoesController();