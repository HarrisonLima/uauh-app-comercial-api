import moment from "moment";
import db from "../../../database";

const getRemanejacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ", 
    credenciais.nome_fantasia AS "Nome fantasia", 
    usuario_remanejador.nome AS "Remanejador",
    usuario_remanejador.usuario AS "Usuário remanejador", 
    usuario_remanejado.nome AS "Remanejado", 
    usuario_remanejado.usuario AS "Usuário remanejado", 
    registros_credenciais_remanejamento.data AS "Data"
FROM 
    credenciais.registros_credenciais_remanejamento 
JOIN 
    credenciais.credenciais 
    ON registros_credenciais_remanejamento.credencial_id = credenciais.id
JOIN 
    cadastros.usuarios AS usuario_remanejador 
    ON registros_credenciais_remanejamento.usuario_id = usuario_remanejador.id
JOIN 
    cadastros.usuarios AS usuario_remanejado 
    ON registros_credenciais_remanejamento.usuario_remanejado_id = usuario_remanejado.id
ORDER BY registros_credenciais_remanejamento.data DESC;`;
    const { rows } = await db.query(query);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Nome fantasia"]: row["Nome fantasia"],
      ["Remanejador"]: `${row["Remanejador"]}(${row["Usuário remanejador"]})`,
      ["Remanejado"]: `${row["Remanejado"]}(${row["Usuário remanejado"]})`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectRemanejacao = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ", 
    credenciais.nome_fantasia AS "Nome fantasia", 
    usuario_remanejador.nome AS "Remanejador",
    usuario_remanejador.usuario AS "Usuário remanejador", 
    usuario_remanejado.nome AS "Remanejado", 
    usuario_remanejado.usuario AS "Usuário remanejado", 
    registros_credenciais_remanejamento.data AS "Data"
FROM 
    credenciais.registros_credenciais_remanejamento 
JOIN 
    credenciais.credenciais 
    ON registros_credenciais_remanejamento.credencial_id = credenciais.id
JOIN 
    cadastros.usuarios AS usuario_remanejador 
    ON registros_credenciais_remanejamento.usuario_id = usuario_remanejador.id
JOIN 
    cadastros.usuarios AS usuario_remanejado 
    ON registros_credenciais_remanejamento.usuario_remanejado_id = usuario_remanejado.id
    WHERE credenciais.cnpj = $1
ORDER BY registros_credenciais_remanejamento.data DESC
    ;`;
    const values = [cnpj];
    const { rows } = await db.query(query, values);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Nome fantasia"]: row["Nome fantasia"],
      ["Remanejador"]: `${row["Remanejador"]}(${row["Usuário remanejador"]})`,
      ["Remanejado"]: `${row["Remanejado"]}(${row["Usuário remanejado"]})`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateRemanejacao = async (cnpj: string, req: any, res: any) => {
  const remanejacao = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_credenciador SET usuario_id = $1 WHERE credencial_credenciador.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2) RETURNING *`;

    values = [remanejacao.remanejado, cnpj];

    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credenciais_remanejamento (usuario_id, usuario_remanejado_id, credencial_id) VALUES ($1, $2, $3) RETURNING *;";
    values = [userId, item.rows[0]["usuario_id"], item.rows[0]["credencial_id"]];

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
  getRemanejacoes,
  selectRemanejacao,
  updateRemanejacao,
};
