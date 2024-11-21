import db from "../../../database";

const getLocalizacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.nome_fantasia AS "Nome fantasia", credencial_localizacao.cep AS "CEP", credencial_localizacao.cidade AS "Cidade", credencial_localizacao.uf AS "UF", credencial_localizacao.bairro AS "Bairro", credencial_localizacao.numero AS "Número", credencial_localizacao.endereco AS "Endereço", credencial_localizacao.complemento AS "Complemento", credencial_localizacao.coordenadas AS "Coordenadas" FROM credenciais.credencial_localizacao JOIN credenciais.credenciais ON credencial_localizacao.credencial_id = credenciais.id  
    ORDER BY credenciais.nome_fantasia ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectLocalizacao = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT credenciais.cnpj AS "CNPJ", credenciais.nome_fantasia AS "Nome fantasia", credencial_localizacao.cep AS "CEP", credencial_localizacao.cidade AS "Cidade", credencial_localizacao.uf AS "UF", credencial_localizacao.bairro AS "Bairro", credencial_localizacao.numero AS "Número", credencial_localizacao.endereco AS "Endereço", credencial_localizacao.complemento AS "Complemento", credencial_localizacao.coordenadas AS "Coordenadas" FROM credenciais.credencial_localizacao JOIN credenciais.credenciais ON credencial_localizacao.credencial_id = credenciais.id  
    WHERE credenciais.cnpj = $1;
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

const updateLocalizacao = async (cnpj: string, req: any, res: any) => {
  const localizacao = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE credenciais.credencial_localizacao SET cep = $1, cidade = $2, uf = $3, bairro = $4, numero = $5, endereco = $6, complemento = $7, coordenadas = $8 WHERE credencial_localizacao.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $9) RETURNING *`;

    values = [
      localizacao.cep,
      localizacao.cidade,
      localizacao.uf,
      localizacao.bairro,
      localizacao.numero,
      localizacao.endereco,
      localizacao.complemento,
      localizacao.coordenadas,
      cnpj,
    ];


    item = await db.query(query, values);
    
    const data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["cep"],
      item.rows[0]["cidade"],
      item.rows[0]["uf"],
      item.rows[0]["bairro"],
      item.rows[0]["numero"],
      item.rows[0]["endereco"],
      item.rows[0]["complemento"],
      item.rows[0]["coordenandas"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [userId, item.rows[0]['credencial_id'], data, "Atualizado", "Localização"];

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
  getLocalizacoes,
  selectLocalizacao,
  updateLocalizacao,
};
