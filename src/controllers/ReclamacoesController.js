import Reclamacoes from "../db/models/Reclamacoes.js";

class ReclamacoesController {
  async store(req, res) {
    const { descricao, status, secretariaResponsavel } = req.body;
    const userId = req.session.userId;
    try {
      const reclamacaoCriada = {
        descricao: descricao,
        status: status.trim() !== "" || "pendente",
        secretariaResponsavel: secretariaResponsavel,
        userId: userId
      };

      await Reclamacoes.create(reclamacaoCriada);

      res.status(200).json({ success: ["Reclamação criada com sucesso!"] });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: [
          "Ocorreu um erro desconhecido ao criar sua reclamação! Tente novamente"
        ]
      });
    }
  }

  async show(req, res) {
    try {
      const reclamacoes = await Reclamacoes.findAll();
      res.status(200).json({ reclamacoes });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar as reclamações!"
      });
    }
  }

  async index(req, res) {
    const id = req.params.id;
    try {
      const reclamacao = await Reclamacoes.findOne({ where: { id: id } });
      res.status(200).json({ reclamacao });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar  reclamação!"
      });
    }
  }

  async reclamacaoUsuario(req, res) {
    const userId = req.session.userId;
    try {
      const reclamacoes = await Reclamacoes.findAll({
        where: { userId: userId }
      });
      res.status(200).json({ reclamacoes });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar as reclamações!"
      });
    }
  }

  async updateWithResponse(req, res) {
    const { resposta, secretariaResponsavel } = req.body;
    const id = req.params.id;

    const reclamacaoEditada = {
      resposta: resposta,
      secretariaResponsavel: secretariaResponsavel
    };

    try {
      await Reclamacoes.update(reclamacaoEditada, { where: { id: id } });
      res.status(200).json({ success: "Reclamação editada com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Ocorreu um erro desconhecido ao responder a reclamação!"]
      });
    }
  }
}

export default new ReclamacoesController();
