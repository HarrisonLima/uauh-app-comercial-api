import db from "../../../database";

const moment = require("moment");

const insertObservacao = async (req: any, res: any): Promise<any> => {
  const observacao = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO clientes.cliente_observacao (usuario_id, cliente_id, observacao) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), $3) RETURNING *;";
    values = [userId, observacao.cliente, observacao.observacao];
    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["cliente_id"],
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
          "DELETE FROM clientes.cliente_observacao WHERE id = $1;",
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
    clientes.cnpj AS "CNPJ", 
    usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário",
    cliente_observacao.observacao AS "Observação",
    cliente_observacao.data AS "Data"
FROM 
    clientes.cliente_observacao
JOIN 
    clientes.clientes ON cliente_observacao.cliente_id = clientes.id
JOIN 
    cadastros.usuarios ON cliente_observacao.usuario_id = usuarios.id
ORDER BY 
    cliente_observacao.data DESC;`;
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
    clientes.cnpj AS "CNPJ", 
    usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário",
    cliente_observacao.observacao AS "Observação",
    cliente_observacao.data AS "Data"
FROM 
    clientes.cliente_observacao
JOIN 
    clientes.clientes ON cliente_observacao.cliente_id = clientes.id
JOIN 
    cadastros.usuarios ON cliente_observacao.usuario_id = usuarios.id
WHERE
    clientes.cnpj = $1
ORDER BY 
    cliente_observacao.data DESC;`;
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
    query = `UPDATE clientes.cliente_observacao SET observacao = $1 WHERE cliente_observacao.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2) RETURNING *`;

    values = [observacao.observacao, cnpj];

    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["cliente_id"],
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
    query = `SELECT cliente_observacao.observacao FROM clientes.cliente_observacao WHERE cliente_observacao.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1)  `;
    values = [cnpj];
    const message = await db.query(query, values);

    query = `DELETE FROM clientes.cliente_observacao WHERE cliente_observacao.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), $3, $4, $5) RETURNING *;";
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
