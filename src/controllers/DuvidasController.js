import Duvidas from "../db/models/Duvidas.js";
import Users from "../db/models/Users.js";

class DuvidasController {
  async store(req, res) {
    const { descricao, secretariaResponsavel, endereco } = req.body;
    const userId = req.user.userId;
    try {
      const reclamacaoCriada = {
        descricao: descricao,
        secretariaResponsavel: secretariaResponsavel,
        userId: userId
      };

      await Duvidas.create(reclamacaoCriada);

      res.status(200).json({ message: ["dúvida criada com sucesso!"] });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: [
          "Ocorreu um erro desconhecido ao criar sua dúvida! Tente novamente"
        ]
      });
    }
  }

  async show(req, res) {
    try {
      const duvidas = await Duvidas.findAll();
      res.status(200).json({ duvidas });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar as dúvidas!"
      });
    }
  }

  async index(req, res) {
    const id = req.params.id;
    try {
      const reclamacao = await Duvidas.findOne({ where: { id: id } });
      res.status(200).json({ reclamacao });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar  dúvida!"
      });
    }
  }

  async duvidasUsuarios(req, res) {
    const userId = req.user.userId;
    console.log(userId);
    try {
      const duvidas = await Duvidas.findAll({
        where: { userId: userId }
      });
      res.status(200).json({ duvidas });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar as dúvidas!"
      });
    }
  }

  async duvidasDaSecretaria(req, res) {
    const userId = req.user.userId;
    try {
      const user = await Users.findOne({ where: { id: userId } });
      const duvidas = await Duvidas.findAll({
        where: { secretariaResponsavel: user.belongingSecretariat }
      });
      res.status(200).json({ duvidas });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar as dúvidas da sua secretaria!"
      });
    }
  }

  async duvidasSemSecretaria(req, res) {
    const userId = req.user.userId;
    try {
      const user = await Users.findOne({ where: { id: userId } });
      const duvidas = await Duvidas.findAll({
        where: { secretariaResponsavel: "nao sei" }
      });
      res.status(200).json({ duvidas });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar as dúvidas da sua secretaria!"
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
      await Duvidas.update(reclamacaoEditada, { where: { id: id } });
      res.status(200).json({ message: "Dúvida editada com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Ocorreu um erro desconhecido ao responder a Dúvida!"]
      });
    }
  }
}

export default new DuvidasController();
