import Users from "../db/models/Users.js";

class HomeController {
  async home(req, res) {
    const userId = req.user.userId;

    try {
      const user = await Users.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(403).json({ errors: "Usuário não encontrado!" }); // esse status faz sentido no contexto, pois ele redireciona para o login!
      }

      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido! Recarregue a página!" });
    }
  }
}

export default new HomeController();
