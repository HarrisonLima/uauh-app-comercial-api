const { verify, decode } = require("jsonwebtoken");

const authToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token nao informado");
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, process.env.JWT_SECRET as string);

    const { id, usuario, nome } = await decode(accessToken);

    req.profileId = id;
    req.profileUsuario = usuario;
    req.profileNome = nome;

    return next();
  } catch (error) {
    res.status(401).send("Usuario não autorizado");
  }
};

export default authToken;
