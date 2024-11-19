import db from "../../../database";

const insertRepresentante = async (req: any, res: any): Promise<any> => {
  const representante = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO credenciais.credencial_representantes (credencial_id, nome, cpf, contato_comercial, testemunha, email, telefone, cargo) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3, $4, $5, $6, $7, $8) RETURNING *;";
    values = [
      representante.credencial,
      representante.nome,
      representante.cpf,
      representante.contatoComercial,
      representante.testemunha,
      representante.email,
      representante.telefone,
      representante.cargo,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["nome"],
      item.rows[0]["cpf"],
      item.rows[0]["contato_comercial"],
      item.rows[0]["testemunha"],
      item.rows[0]["email"],
      item.rows[0]["telefone"],
      item.rows[0]["cargo"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Cadastrado",
      "Representante",
    ];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_representantes WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getRepresentantes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credencial_representantes.nome AS "Nome", credencial_representantes.cpf AS "CPF", credencial_representantes.contato_comercial AS "Contato comercial?", credencial_representantes.testemunha AS "Testemunha?", credencial_representantes.email AS "E-mail", credencial_representantes.telefone AS "Telefone", credencial_representantes.cargo AS "Cargo" FROM credenciais.credencial_representantes 
    JOIN credenciais.credenciais ON credencial_representantes.credencial_id = credenciais.id 
    ORDER BY credencial_representantes.nome ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectRepresentante = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credencial_representantes.nome AS "Nome", credencial_representantes.cpf AS "CPF", credencial_representantes.contato_comercial AS "Contato comercial?", credencial_representantes.testemunha AS "Testemunha?", credencial_representantes.email AS "E-mail", credencial_representantes.telefone AS "Telefone", credencial_representantes.cargo AS "Cargo" FROM credenciais.credencial_representantes 
    JOIN credenciais.credenciais ON credencial_representantes.credencial_id = credenciais.id 
    WHERE credenciais.cnpj = $1
    ORDER BY credencial_representantes.nome ASC;
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

const updateRepresentante = async (cpf: string, req: any, res: any) => {
  const representante = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_representantes SET nome = $1, contato_comercial = $2, testemunha = $3, email = $4, telefone = $5, cargo = $6 WHERE credencial_representantes.cpf = $7 RETURNING *`;

    values = [
      representante.nome,
      representante.contatoComercial,
      representante.testemunha,
      representante.email,
      representante.telefone,
      representante.cargo,
      cpf,
    ];

    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["nome"],
      item.rows[0]["cpf"],
      item.rows[0]["contato_comercial"],
      item.rows[0]["testemunha"],
      item.rows[0]["email"],
      item.rows[0]["telefone"],
      item.rows[0]["cargo"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Atualizado",
      "Representante",
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

const deleteRepresentante = async (
  cpf: string,
  req: any,
  res: any
): Promise<any> => {
  const userId = req;
  let query: string, values: any, item: any;
  try {
    query = `SELECT * FROM credenciais.credencial_representantes WHERE cpf = $1`;
    values = [cpf];

    const representante = await db.query(query, values);

    query = `DELETE FROM credenciais.credencial_representantes WHERE credencial_representantes.id = $1`;
    values = [representante.rows[0].id];
    item = await db.query(query, values);

    const data = [
      representante.rows[0]["id"],
      representante.rows[0]["credencial_id"],
      representante.rows[0]["nome"],
      representante.rows[0]["cpf"],
      representante.rows[0]["contato_comercial"],
      representante.rows[0]["testemunha"],
      representante.rows[0]["email"],
      representante.rows[0]["telefone"],
      representante.rows[0]["cargo"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      representante.rows[0]["credencial_id"],
      data,
      "Excluído",
      "Representante",
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
  insertRepresentante,
  getRepresentantes,
  selectRepresentante,
  updateRepresentante,
  deleteRepresentante,
};
