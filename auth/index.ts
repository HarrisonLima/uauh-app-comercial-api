import db from "../database";
import generateToken from "../token/generateToken";
import MatchPassword from "../utilities/MatchPassword";

const auth = async (req: any) => {
  const user = req;
  console.log("Payload: ", user);

  try {
    const result = await db.query(
      `SELECT usuarios.id, usuarios.usuario, usuarios.nome, usuarios.senha, perfis_acesso.perfil_acesso, usuarios.situacao
    FROM cadastros.usuarios 
    JOIN cadastros.perfis_acesso ON usuarios.perfil_acesso_id = perfis_acesso.id
    WHERE usuarios.usuario = $1`,
      [user.user]
    );

    const userDb = result.rows[0];

    if (result.rows.length === 0) {
      throw Error("Usuário não encontrado");
    }

    if (userDb.situacao !== "Ativo") {
      throw Error("Usuário inativo");
    }

    const passwordMatch = MatchPassword(user.password, userDb.senha);

    if (!passwordMatch) {
      throw Error("Senha incorreta");
    }

    const token = generateToken(userDb);
    console.log("Token gerado:", token);

    delete userDb.id;
    delete userDb.senha;
    delete userDb.situacao;

    return { token, userDb };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getUser = async (req: any) => {
  const user = req;
  console.log("Payload: ", user);

  try {
    const result = await db.query(
      `SELECT usuarios.id, usuarios.usuario, usuarios.nome, usuarios.senha, perfis_acesso.perfil_acesso, usuarios.situacao
    FROM cadastros.usuarios 
    JOIN cadastros.perfis_acesso ON usuarios.perfil_acesso_id = perfis_acesso.id
    WHERE usuarios.usuario = $1`,
      [user.user]
    );

    const userDb = result.rows[0];
    
    if (result.rows.length === 0) {
      throw Error("Usuário inválido");
    }
    if (userDb.situacao !== "Ativo") {
      throw Error("Usuário inválido");
    }
    
    const passwordMatch = MatchPassword(user.password, userDb.senha);
    if (!passwordMatch) {
      throw Error("Usuário inválido");
    }

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
module.exports = {
  auth,
  getUser,
};
