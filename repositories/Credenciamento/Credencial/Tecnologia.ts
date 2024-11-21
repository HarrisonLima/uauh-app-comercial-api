import db from "../../../database";

const insertTecnologia = async (req: any, res: any): Promise<any> => {
  const tecnologia = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO credenciais.credencial_tecnologias (credencial_id, equipamento_id, cnpj_equipamento, ec_equipamento) VALUES ((SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1), $2, $3, $4) RETURNING *;";
    values = [
      tecnologia.credencial,
      tecnologia.idEquipamento,
      tecnologia.cnpjEquipamento,
      tecnologia.ecEquipamento,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["equipamento_id"],
      item.rows[0]["cnpj_equipamento"],
      item.rows[0]["ec_equipamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Cadastrado",
      "Tecnologia",
    ];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_tecnologias WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getTecnologias = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.razao_social AS "Razão social", credenciais.nome_fantasia AS "Nome fantasia", equipamentos.equipamento AS "Equipamento", credencial_tecnologias.cnpj_equipamento AS "CNPJ equipamento", credencial_tecnologias.ec_equipamento AS "EC equipamento" FROM credenciais.credencial_tecnologias JOIN credenciais.credenciais ON credenciais.id = credencial_tecnologias.credencial_id 
    JOIN cadastros.equipamentos ON equipamentos.id = credencial_tecnologias.equipamento_id 
    ORDER BY credenciais.nome_fantasia ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectTecnologia = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.razao_social AS "Razão social", credenciais.nome_fantasia AS "Nome fantasia", equipamentos.equipamento AS "Equipamento", credencial_tecnologias.cnpj_equipamento AS "CNPJ equipamento", credencial_tecnologias.ec_equipamento AS "EC equipamento" FROM credenciais.credencial_tecnologias JOIN credenciais.credenciais 
    ON credenciais.id = credencial_tecnologias.credencial_id 
    JOIN cadastros.equipamentos ON equipamentos.id = credencial_tecnologias.equipamento_id 
    WHERE credenciais.cnpj = $1
    ORDER BY credenciais.nome_fantasia ASC;
    ;`;
    const values = [cnpj];
    const { rows } = await db.query(query, values);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateTecnologia = async (cnpj: string, req: any, res: any) => {
  const tecnologia = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_tecnologias SET equipamento_id = $1, cnpj_equipamento = $2, ec_equipamento = $3 WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $4) RETURNING *`;
    values = [
      tecnologia.idEquipamento,
      tecnologia.cnpjEquipamento,
      tecnologia.ecEquipamento,
      cnpj,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["equipamento_id"],
      item.rows[0]["cnpj_equipamento"],
      item.rows[0]["ec_equipamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Atualizado",
      "Tecnologia",
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

const deleteTecnologia = async (
  cnpj: string,
  req: any,
  res: any
): Promise<any> => {
  const equipamento = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;
  try {
    query = `SELECT * FROM credenciais.credencial_tecnologias WHERE cnpj_equipamento = $1 AND equipamento_id = $2`;
    values = [cnpj, equipamento];

    const tecnologia = await db.query(query, values);

    query = `DELETE FROM credenciais.credencial_tecnologias WHERE credencial_tecnologias.id = $1`;
    values = [tecnologia.rows[0].id];
    item = await db.query(query, values);

    const data = [
      tecnologia.rows[0]["id"],
      tecnologia.rows[0]["credencial_id"],
      tecnologia.rows[0]["tecnologia_id"],
      tecnologia.rows[0]["cnpj_equipamento"],
      tecnologia.rows[0]["ec_equipamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      tecnologia.rows[0]["credencial_id"],
      data,
      "Excluído",
      "Tecnologia",
    ];

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
  insertTecnologia,
  getTecnologias,
  selectTecnologia,
  updateTecnologia,
  deleteTecnologia,
};
