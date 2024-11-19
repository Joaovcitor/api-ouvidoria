import Users from "../db/models/Users.js";

export default async function checkUser(req, res, next) {
  const { email, cpf } = req.body;

  try {
    const userWithCpf = await Users.findOne({ where: { cpf: cpf } });
    const userWithEmail = await Users.findOne({ where: { email: email } });


    if (userWithCpf) {
      return res.status(400).json({ errors: ["Usuário já cadastrado com esse CPF!"] });
    }

    if (userWithEmail) {
      return res.status(400).json({ errors: ["Usuário já cadastrado com esse E-mail!"] });
    }

    next()
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: ["Ocorreu um erro desconhecido!"] })
  }
}