import db from "../../database";
import isUniquePerfilAcesso from "../../validators/isUniquePerfilAcesso";

const insertPerfilAcesso = async (req: any, res: any): Promise<any> => {
  const perfilAcesso = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isUnique = await isUniquePerfilAcesso(perfilAcesso.perfilAcesso);
    if (isUnique) {
      query = `INSERT INTO cadastros.perfis_acesso (perfil_acesso) VALUES ($1) RETURNING *`;
      values = [perfilAcesso.perfilAcesso];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["perfil_acesso"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_perfis_acesso (usuario_id, perfil_acesso_id, perfil_acesso, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
      values = [userId, item.rows[0].id, data, "Cadastrado"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      return registro.rows;
    } else {
      res.status(409).json("Item já cadastrado");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(`DELETE FROM cadastros.perfis_acesso WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
        res.status(500).json({ error });
    throw Error;
  }
};

const getPerfisAcesso = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT id, perfil_acesso AS "Perfil Acesso", situacao AS "Situação" 
    FROM cadastros.perfis_acesso
    ORDER BY perfil_acesso;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
        res.status(500).json({ error });
    throw Error;
  }
};

const selectPerfilAcesso = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT id, perfil_acesso AS "Perfil Acesso", situacao AS "Situação" 
    FROM cadastros.perfis_acesso
    WHERE id = $1;`;
    const values = [id];
    const { rows } = await db.query(query, values);

    return rows[0];
  } catch (error: any) {
    console.error("Error: ", error);
        res.status(500).json({ error });
    throw Error;
  }
};

const updatePerfilAcesso = async (id: number, req: any, res: any) => {
  const perfilAcesso = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.perfis_acesso SET perfil_acesso = $1, situacao = $2 WHERE id = $3 RETURNING *`;
    values = [perfilAcesso.perfilAcesso, perfilAcesso.situacao, id];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["perfil_acesso"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_perfis_acesso (usuario_id, perfil_acesso_id, perfil_acesso, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      perfilAcesso.situacao === "Inativo" ? "Inativado" : "Atualizado",
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
  insertPerfilAcesso,
  getPerfisAcesso,
  selectPerfilAcesso,
  updatePerfilAcesso,
};
