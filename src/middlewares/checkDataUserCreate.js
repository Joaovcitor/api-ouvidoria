import validator from "validator";

export default function checkData(req, res, next) {
  const { name, email } = req.body;

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ errors: "E-mail é inválido, verifique o e-mail digitado" });
  }

  if (validator.isEmpty(name)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" });
  }

  next();
}

