import db from "../../database";
import Encrypt from "./../../utilities/Encrypt";
import isUniqueUsuario from "../../validators/isUniqueUsuario";

const insertUsuario = async (req: any, res: any): Promise<any> => {
  const usuario = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueUsuario(usuario.usuario);

    if (isValid) {
      query = `INSERT INTO cadastros.usuarios (perfil_acesso_id, usuario, senha, nome) VALUES ($1, $2, $3, $4) RETURNING *;`;
      values = [
        usuario.perfilAcesso,
        usuario.usuario,
        Encrypt(usuario.senha),
        usuario.nome,
      ];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["perfil_acesso_id"],
        item.rows[0]["usuario"],
        item.rows[0]["nome"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_usuarios (usuario_id, usuario_modificado_id, usuario_modificado, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
      values = [userId, item.rows[0].id, data, "Cadastrado"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      return registro.rows;
    } else {
      res.status(409).json("Item já cadastrado");
    }
  } catch (error: any) {
    console.error("Error: ", error.detail);
    item.rows[0]
      ? await db.query(`DELETE FROM cadastros.usuarios WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getUsuarios = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT usuarios.id, usuarios.usuario AS "Usuário", usuarios.nome AS "Nome", perfis_acesso.perfil_acesso "Perfil Acesso", usuarios.situacao AS "Situação" 
    FROM cadastros.usuarios 
    JOIN cadastros.perfis_acesso ON usuarios.perfil_acesso_id = perfis_acesso.id
    ORDER BY usuario ASC;
    ;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectUsuario = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT usuarios.id, usuarios.usuario AS "Usuário", usuarios.nome AS "Nome", perfis_acesso.perfil_acesso "Perfil Acesso", usuarios.situacao AS "Situação" 
      FROM cadastros.usuarios 
      JOIN cadastros.perfis_acesso ON usuarios.perfil_acesso_id = perfis_acesso.id
      WHERE usuarios.id = $1;`;
    const values = [id];
    const { rows } = await db.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateUsuario = async (id: number, req: any, res: any) => {
  const usuario = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    if (usuario.senha === undefined) {
      if (typeof usuario.perfilAcesso === "string") {
        query = `UPDATE cadastros.usuarios SET perfil_acesso_id = (SELECT id FROM cadastros.perfis_acesso WHERE perfil_acesso = $1), usuario = $2, nome = $3, situacao = $4 WHERE id = $5 RETURNING *`;
      } else {
        query = `UPDATE cadastros.usuarios SET perfil_acesso_id = $1, usuario = $2, nome = $3, situacao = $4 WHERE id = $5 RETURNING *`;
      }
      values = [
        usuario.perfilAcesso,
        usuario.usuario,
        usuario.nome,
        usuario.situacao,
        id,
      ];
    } else {
      if (typeof usuario.perfilAcesso === "string") {
        query = `UPDATE cadastros.usuarios SET perfil_acesso_id = (SELECT id FROM cadastros.perfis_acesso WHERE perfil_acesso = $1), usuario = $2, nome = $3, senha = $4, situacao = $5 WHERE id = $6 RETURNING *`;
      } else {
        query = `UPDATE cadastros.usuarios SET perfil_acesso_id = $1, usuario = $2, nome = $3, senha = $4, situacao = $5 WHERE id = $6 RETURNING *`;
      }
      values = [
        usuario.perfilAcesso,
        usuario.usuario,
        usuario.nome,
        Encrypt(usuario.senha),
        usuario.situacao,
        id,
      ];
    }

    item = await db.query(query, values);

    delete item.rows[0].senha;

    const data = [
      item.rows[0]["id"],
      item.rows[0]["perfil_acesso_id"],
      item.rows[0]["usuario"],
      item.rows[0]["nome"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_usuarios (usuario_id, usuario_modificado_id, usuario_modificado, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      usuario.situacao === "Inativo" ? "Inativado" : "Atualizado",
    ];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

module.exports = {
  insertUsuario,
  getUsuarios,
  selectUsuario,
  updateUsuario,
};
