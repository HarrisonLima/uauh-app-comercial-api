import db from "../../../database";

const insertDadosBancarios = async (req: any, res: any): Promise<any> => {
  const dadosBancarios = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query =
      "INSERT INTO credenciais.credencial_dados_bancarios (credencial_id, titular_proprio, nome_titular, documento_titular, tipo_conta, banco, agencia, conta, chave_pix) VALUES ((SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1), $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;";
    values = [
      dadosBancarios.credencial,
      dadosBancarios.titular_proprio,
      dadosBancarios.nome_titular,
      dadosBancarios.documento_titular,
      dadosBancarios.tipo_conta,
      dadosBancarios.banco,
      dadosBancarios.agencia,
      dadosBancarios.conta,
      dadosBancarios.chave_pix,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["titular_proprio"],
      item.rows[0]["nome_titular"],
      item.rows[0]["documento_titular"],
      item.rows[0]["tipo_conta"],
      item.rows[0]["banco"],
      item.rows[0]["agencia"],
      item.rows[0]["conta"],
      item.rows[0]["chave_pix"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [userId, item.rows[0].id, data, "Cadastrado", "Dados bancários"];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro;
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_dados_bancarios WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getDadosBancarios = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.razao_social AS "Razão social", credenciais.nome_fantasia AS "Nome fantasia", credencial_dados_bancarios.titular_proprio AS "Titular próprio", credencial_dados_bancarios.nome_titular AS "Nome titular", credencial_dados_bancarios.documento_titular AS "Documento titular", credencial_dados_bancarios.tipo_conta AS "Tipo conta", credencial_dados_bancarios.banco AS "Banco", credencial_dados_bancarios.agencia AS "Agência", credencial_dados_bancarios.conta AS "Conta", credencial_dados_bancarios.chave_pix AS "Chave pix" FROM credenciais.credencial_dados_bancarios JOIN 
    credenciais.credenciais 
    ON credenciais.id = credencial_dados_bancarios.credencial_id 
    ORDER BY credenciais.nome_fantasia ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectDadosBancarios = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.razao_social AS "Razão social", credenciais.nome_fantasia AS "Nome fantasia", credencial_dados_bancarios.titular_proprio AS "Titular próprio", credencial_dados_bancarios.nome_titular AS "Nome titular", credencial_dados_bancarios.documento_titular AS "Documento titular", credencial_dados_bancarios.tipo_conta AS "Tipo conta", credencial_dados_bancarios.banco AS "Banco", credencial_dados_bancarios.agencia AS "Agência", credencial_dados_bancarios.conta AS "Conta", credencial_dados_bancarios.chave_pix AS "Chave pix" FROM credenciais.credencial_dados_bancarios 
    JOIN 
    credenciais.credenciais 
    ON credenciais.id = credencial_dados_bancarios.credencial_id 
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

const updateDadosBancarios = async (cnpj: string, req: any, res: any) => {
  const dadosBancarios = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_dados_bancarios SET titular_proprio = $1, nome_titular = $2, documento_titular = $3, tipo_conta = $4, banco = $5, agencia = $6, conta = $7 , chave_pix = $8 WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE credencias.cnpj = $9) RETURNING *`;
    values = [
      dadosBancarios.credencial,
      dadosBancarios.titular_proprio,
      dadosBancarios.nome_titular,
      dadosBancarios.documento_titular,
      dadosBancarios.tipo_conta,
      dadosBancarios.banco,
      dadosBancarios.agencia,
      dadosBancarios.conta,
      dadosBancarios.chave_pix,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["titular_proprio"],
      item.rows[0]["nome_titular"],
      item.rows[0]["documento_titular"],
      item.rows[0]["tipo_conta"],
      item.rows[0]["banco"],
      item.rows[0]["agencia"],
      item.rows[0]["conta"],
      item.rows[0]["chave_pix"],
    ];
    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [userId, item.rows[0].id, data, "Atualizado", "Dados bancários"];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

module.exports = {
  insertDadosBancarios,
  getDadosBancarios,
  selectDadosBancarios,
  updateDadosBancarios,
};
