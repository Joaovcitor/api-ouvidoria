import Reclamacoes from "../db/models/Reclamacoes.js";
import Users from "../db/models/Users.js";
import Fotos from "../db/models/Fotos.js";

class ReclamacoesController {
  async store(req, res) {
    const { descricao, secretariaResponsavel, endereco } = req.body;

    const userId = req.user.userId;
    try {
      const reclamacaoCriada = {
        descricao: descricao,
        secretariaResponsavel: secretariaResponsavel,
        endereco: endereco,
        userId: userId
      };

      const reclamacao = await Reclamacoes.create(reclamacaoCriada);

      res
        .status(200)
        .json({ reclamacao, message: ["Reclamação criada com sucesso!"] });
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
      const reclamacoes = await Reclamacoes.findAll({
        include: {
          model: Fotos
        }
      });
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
    const userId = req.user.userId;
    console.log(userId);
    try {
      const reclamacoes = await Reclamacoes.findAll({
        where: { userId: userId },
        include: {
          model: Fotos,
          as: "Fotos"
        }
      });
      res.status(200).json({ reclamacoes });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar as reclamações!"
      });
    }
  }

  async reclamacaoDaSecretaria(req, res) {
    const userId = req.user.userId;
    try {
      const user = await Users.findOne({ where: { id: userId } });
      const reclamacoes = await Reclamacoes.findAll({
        where: { secretariaResponsavel: user.belongingSecretariat }
      });
      res.status(200).json({ reclamacoes });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar as reclamações da sua secretaria!"
      });
    }
  }

  async reclamacaoSemSecretaria(req, res) {
    const userId = req.user.userId;
    try {
      const user = await Users.findOne({ where: { id: userId } });
      const reclamacoes = await Reclamacoes.findAll({
        where: { secretariaResponsavel: "nao sei" }
      });
      res.status(200).json({ reclamacoes });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar as reclamações da sua secretaria!"
      });
    }
  }

  async updateWithResponse(req, res) {
    const { resposta, secretariaResponsavel, status } = req.body;
    const id = req.params.id;

    const reclamacaoEditada = {
      resposta: resposta,
      secretariaResponsavel: secretariaResponsavel,
      status
    };

    try {
      await Reclamacoes.update(reclamacaoEditada, { where: { id: id } });
      res.status(200).json({ message: "Reclamação editada com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Ocorreu um erro desconhecido ao responder a reclamação!"]
      });
    }
  }
}

export default new ReclamacoesController();
