import dotenv from "dotenv";

const { verify } = require("jsonwebtoken");

const UsuarioRepository = require("../repositories/Cadastro/Usuario");

const verifyToken = async (req: any, res: any) => {
  dotenv.config();

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token nao informado");
  }

  const [, accessToken] = token.split(" ");

  try {
    const valid = verify(accessToken, process.env.JWT_SECRET as string);

    const usuarios = await UsuarioRepository.selectUsuario(valid.id)
    const user = {
      usuario: usuarios['Usuário'],
      nome: usuarios['Nome'],
      perfil_acesso: usuarios['Perfil Acesso'],
    }

    res.status(200).send({ valid: true, user });
  } catch (error) {
    res.status(401).send({ valid: false });
  }
};

export default verifyToken;
