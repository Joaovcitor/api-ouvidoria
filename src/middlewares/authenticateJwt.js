import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ invalid_token: "Token inválido ou não informado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({
      errorInternal: "Ocorreu um erro inesperado! Tente novamente."
    });
  }
};
