import db from "../../../database";

const moment = require("moment");

const insertJustificativa = async (req: any, res: any): Promise<any> => {
  const justificativa = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO clientes.cliente_justificativa (usuario_id, cliente_id, status_id, justificativa) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), (SELECT id FROM cadastros.status WHERE status.status = $3), $4) RETURNING *;";
    values = [
      userId,
      justificativa.cliente,
      justificativa.status,
      justificativa.justificativa,
    ];
    item = await db.query(query, values);

    const justificativaId = item.rows[0]["id"];
    const clienteId = item.rows[0]["cliente_id"];

    query =
      "INSERT INTO clientes.registros_clientes_justificativas (usuario_id, cliente_id, status_id, justificativa) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), (SELECT id FROM cadastros.status WHERE status.status = $3), $4) RETURNING *;";
    values = [
      userId,
      justificativa.cliente,
      justificativa.status,
      justificativa.justificativa,
    ];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    query = `UPDATE clientes.cliente_status SET status_id = (SELECT id FROM cadastros.status WHERE status.status = $1) WHERE cliente_status.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2 ) RETURNING *`;

    values = [justificativa.status, justificativa.cliente];
    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes_status (usuario_id, cliente_id, status_id) VALUES ($1, $2, $3) RETURNING *;";
    values = [userId, item.rows[0]["cliente_id"], item.rows[0]["status_id"]];

    const registroStatus = await db.query(query, values);

    query =
      "DELETE FROM clientes.cliente_justificativa WHERE cliente_justificativa.cliente_id = $1 AND cliente_justificativa.id != $2";
    values = [justificativaId, clienteId];

    await db.query(query, values);

    return [registro.rows, registroStatus.rows];
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM clientes.cliente_justificativa WHERE id = $1;",
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
    cliente_justificativa.id, 
    clientes.cnpj AS "CNPJ", 
    status.status AS "Status",
    usuarios.usuario AS "Usuário",
    usuarios.nome AS "Nome do Usuário",
    cliente_justificativa.justificativa AS "Justificativa",
    registros_clientes_justificativas.data AS "Data"
FROM 
    clientes.cliente_justificativa
JOIN 
    clientes.clientes ON cliente_justificativa.cliente_id = clientes.id
JOIN 
    cadastros.status ON cliente_justificativa.status_id = status.id
JOIN 
    clientes.registros_clientes_justificativas ON cliente_justificativa.cliente_id = registros_clientes_justificativas.cliente_id 
    AND cliente_justificativa.status_id = registros_clientes_justificativas.status_id
JOIN 
    cadastros.usuarios ON registros_clientes_justificativas.usuario_id = usuarios.id
ORDER BY 
    registros_clientes_justificativas.data DESC;`;
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
    cliente_justificativa.id, 
    clientes.cnpj AS "CNPJ", 
    status.status AS "Status",
    usuarios.usuario AS "Usuário",
    usuarios.nome AS "Nome do Usuário",
    cliente_justificativa.justificativa AS "Justificativa",
    registros_clientes_justificativas.data AS "Data"
FROM 
    clientes.cliente_justificativa
JOIN 
    clientes.clientes ON cliente_justificativa.cliente_id = clientes.id
JOIN 
    cadastros.status ON cliente_justificativa.status_id = status.id
JOIN 
    clientes.registros_clientes_justificativas ON cliente_justificativa.cliente_id = registros_clientes_justificativas.cliente_id 
    AND cliente_justificativa.status_id = registros_clientes_justificativas.status_id
JOIN 
    cadastros.usuarios ON registros_clientes_justificativas.usuario_id = usuarios.id
WHERE
    clientes.cnpj = $1
ORDER BY 
    registros_clientes_justificativas.data DESC
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

    query = `SELECT cliente_justificativa.justificativa FROM clientes.cliente_justificativa WHERE cliente_justificativa.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1)  `;
    values = [cnpj];
    const message = await db.query(query, values);

    query = `DELETE FROM clientes.cliente_justificativa WHERE cliente_justificativa.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), $3, $4, $5) RETURNING *;";
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
