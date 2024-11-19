import db from "../../../database";

const moment = require("moment");

const insertObservacao = async (req: any, res: any): Promise<any> => {
  const observacao = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO credenciais.credencial_observacao (usuario_id, credencial_id, observacao) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), $3) RETURNING *;";
    values = [userId, observacao.credencial, observacao.observacao];
    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      observacao.observacao,
      "Cadastrado",
      "Observação",
    ];

    const registro = await db.query(query, values);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_observacao WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getObservacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ", 
    usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário",
    credencial_observacao.observacao AS "Observação",
    credencial_observacao.data AS "Data"
FROM 
    credenciais.credencial_observacao
JOIN 
    credenciais.credenciais ON credencial_observacao.credencial_id = credenciais.id
JOIN 
    cadastros.usuarios ON credencial_observacao.usuario_id = usuarios.id
ORDER BY 
    credencial_observacao.data DESC;`;
    const { rows } = await db.query(query);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Usuário"]: `${row["Nome"]}(${row["Usuário"]})`,
      ["Observação"]: row["Observação"],
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectObservacao = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ", 
    usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário",
    credencial_observacao.observacao AS "Observação",
    credencial_observacao.data AS "Data"
FROM 
    credenciais.credencial_observacao
JOIN 
    credenciais.credenciais ON credencial_observacao.credencial_id = credenciais.id
JOIN 
    cadastros.usuarios ON credencial_observacao.usuario_id = usuarios.id
WHERE
    credenciais.cnpj = $1
ORDER BY 
    credencial_observacao.data DESC;`;
    const values = [cnpj];
    const { rows } = await db.query(query, values);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Usuário"]: `${row["Nome"]}(${row["Usuário"]})`,
      ["Observação"]: row["Observação"],
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateObservacao = async (cnpj: string, req: any, res: any) => {
  const observacao = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_observacao SET observacao = $1 WHERE credencial_observacao.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2) RETURNING *`;

    values = [observacao.observacao, cnpj];

    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      observacao.observacao,
      "Atualizado",
      "Observação",
    ];

    const registro = await db.query(query, values);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const deleteObservacao = async (
  cnpj: string,
  req: any,
  res: any
): Promise<any> => {
  const userId = req;
  let query: string, values: any, item: any;
  try {
    query = `SELECT credencial_observacao.observacao FROM credenciais.credencial_observacao WHERE credencial_observacao.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1)  `;
    values = [cnpj];
    const message = await db.query(query, values);

    query = `DELETE FROM credenciais.credencial_observacao WHERE credencial_observacao.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), $3, $4, $5) RETURNING *;";
    values = [userId, cnpj, message.rows[0].observacao, "Excluído", "Observação"];

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
  insertObservacao,
  getObservacoes,
  selectObservacao,
  updateObservacao,
  deleteObservacao,
};
