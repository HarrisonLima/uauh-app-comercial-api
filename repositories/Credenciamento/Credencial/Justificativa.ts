import db from "../../../database";

const moment = require("moment");

const insertJustificativa = async (req: any, res: any): Promise<any> => {
  const justificativa = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO credenciais.credencial_justificativa (usuario_id, credencial_id, status_id, justificativa) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), (SELECT id FROM cadastros.status WHERE status.status = $3), $4) RETURNING *;";
    values = [
      userId,
      justificativa.credencial,
      justificativa.status,
      justificativa.justificativa,
    ];
    item = await db.query(query, values);

    const justificativaId = item.rows[0]["id"];
    const credencialId = item.rows[0]["credencial_id"];

    query =
      "INSERT INTO credenciais.registros_credenciais_justificativas (usuario_id, credencial_id, status_id, justificativa) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), (SELECT id FROM cadastros.status WHERE status.status = $3), $4) RETURNING *;";
    values = [
      userId,
      justificativa.credencial,
      justificativa.status,
      justificativa.justificativa,
    ];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    query = `UPDATE credenciais.credencial_status SET status_id = (SELECT id FROM cadastros.status WHERE status.status = $1) WHERE credencial_status.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2 ) RETURNING *`;

    values = [justificativa.status, justificativa.credencial];
    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credencials_status (usuario_id, credencial_id, status_id) VALUES ($1, $2, $3) RETURNING *;";
    values = [userId, item.rows[0]["credencial_id"], item.rows[0]["status_id"]];

    const registroStatus = await db.query(query, values);

    query =
      "DELETE FROM credenciais.credencial_justificativa WHERE credencial_justificativa.credencial_id = $1 AND credencial_justificativa.id != $2";
    values = [justificativaId, credencialId];

    await db.query(query, values);

    return [registro.rows, registroStatus.rows];
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_justificativa WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getJustificativas = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const query = `SELECT 
    credencial_justificativa.id, 
    credenciais.cnpj AS "CNPJ", 
    status.status AS "Status",
    usuarios.usuario AS "Usuário",
    usuarios.nome AS "Nome do Usuário",
    credencial_justificativa.justificativa AS "Justificativa",
    registros_credenciais_justificativas.data AS "Data"
FROM 
    credenciais.credencial_justificativa
JOIN 
    credenciais.credenciais ON credencial_justificativa.credencial_id = credenciais.id
JOIN 
    cadastros.status ON credencial_justificativa.status_id = status.id
JOIN 
    credenciais.registros_credenciais_justificativas ON credencial_justificativa.credencial_id = registros_credenciais_justificativas.credencial_id 
    AND credencial_justificativa.status_id = registros_credenciais_justificativas.status_id
JOIN 
    cadastros.usuarios ON registros_credenciais_justificativas.usuario_id = usuarios.id
ORDER BY 
    registros_credenciais_justificativas.data DESC;`;
    const { rows } = await db.query(query);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      Status: row.Status,
      ["Usuário"]: row["Usuário"],
      ["Nome do Usuário"]: row["Nome do Usuário"],
      Justificativa: row.Justificativa,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectJustificativa = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT 
    credencial_justificativa.id, 
    credenciais.cnpj AS "CNPJ", 
    status.status AS "Status",
    usuarios.usuario AS "Usuário",
    usuarios.nome AS "Nome do Usuário",
    credencial_justificativa.justificativa AS "Justificativa",
    registros_credenciais_justificativas.data AS "Data"
FROM 
    credenciais.credencial_justificativa
JOIN 
    credenciais.credenciais ON credencial_justificativa.credencial_id = credenciais.id
JOIN 
    cadastros.status ON credencial_justificativa.status_id = status.id
JOIN 
    credenciais.registros_credenciais_justificativas ON credencial_justificativa.credencial_id = registros_credenciais_justificativas.credencial_id 
    AND credencial_justificativa.status_id = registros_credenciais_justificativas.status_id
JOIN 
    cadastros.usuarios ON registros_credenciais_justificativas.usuario_id = usuarios.id
WHERE
    credenciais.cnpj = $1
ORDER BY 
    registros_credenciais_justificativas.data DESC
    ;`;
    const values = [cnpj];
    const { rows } = await db.query(query, values);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      Status: row.Status,
      ["Usuário"]: row["Usuário"],
      ["Nome do Usuário"]: row["Nome do Usuário"],
      Justificativa: row.Justificativa,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const deleteJustificativa = async (
  cnpj: string,
  req: any,
  res: any
): Promise<any> => {
  const userId = req;
  let query: string, values: any, item: any;
  try {

    query = `SELECT credencial_justificativa.justificativa FROM credenciais.credencial_justificativa WHERE credencial_justificativa.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1)  `;
    values = [cnpj];
    const message = await db.query(query, values);

    query = `DELETE FROM credenciais.credencial_justificativa WHERE credencial_justificativa.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credencials (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), $3, $4, $5) RETURNING *;";
    values = [userId, cnpj, message.rows[0].justificativa, "Excluído", "Justificativa"];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return [registro.rows, true];
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

module.exports = {
  insertJustificativa,
  getJustificativas,
  selectJustificativa,
  deleteJustificativa,
};
