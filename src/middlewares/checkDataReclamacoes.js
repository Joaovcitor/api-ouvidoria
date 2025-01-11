import validator from "validator";

export default function checkDataReclamacao(req, res, next) {
  const { descricao, status, secretariaResponsavel } = req.body;

  let errors = [];

  if (
    validator.isEmpty(descricao) ||
    descricao.length <= 4 ||
    descricao.length > 800
  ) {
    errors.push(["Descrição tem que ter entre 4 a 800 caracteres"]);
  }

  if (!secretariaResponsavel) {
    errors.push(["Escolha uma opção de secretaria!"]);
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
