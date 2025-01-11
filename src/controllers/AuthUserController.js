import bcrypt from "bcryptjs";
import Users from "../db/models/Users.js";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ errors: "Usuário não encontrado!" });
      }

      const passwordHash = bcrypt.compareSync(password, user.password);
      if (!passwordHash) {
        return res.status(400).json({ errors: "Senha invalida!" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          userRole: user.role
        },
        process.env.SECRET_JWT,
        {
          expiresIn: "24h"
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
      });

      res.status(200).json({
        token,

        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id
        }
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao autenticar o usuário." });
    }
  }
}

export default new AuthController();
