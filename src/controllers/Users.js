import Users from "../db/models/Users.js";
import HashService from "../services/HashService.js";

class UserController {
  async store(req, res) {
    const { name, email, cpf, password } = req.body;

    try {
      const hashedPassword = await HashService.hashPassword(password);

      const userCreate = {
        name: name,
        email: email,
        cpf: cpf,
        password: hashedPassword
      };

      const userCreated = await Users.create(userCreate);

      req.session.userId = userCreated.id;

      return res.status(200).json({ success: ["Usuário criado com sucesso"] });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errors: [
          "Ocorreu um erro desconhecido ao criar seu usuário, tente novamente."
        ]
      });
    }
  }
}

export default new UserController();
