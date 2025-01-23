export default async function checkRoleUser(req, res, next) {
  const userRole = req.user.userRole;
  if (userRole === "comum") {
    return res.status(403).json({ errors: "Acesso negado!" });
  }
  next();
}
