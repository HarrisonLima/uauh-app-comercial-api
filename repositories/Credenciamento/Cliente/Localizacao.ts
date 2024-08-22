import db from "../../../database";

const getLocalizacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", cliente_localizacao.cep AS "CEP", cliente_localizacao.cidade AS "Cidade", cliente_localizacao.uf AS "UF", cliente_localizacao.bairro AS "Bairro", cliente_localizacao.numero AS "Número", cliente_localizacao.endereco AS "Endereço", cliente_localizacao.complemento AS "Complemento" FROM clientes.cliente_localizacao JOIN clientes.clientes ON cliente_localizacao.cliente_id = clientes.id  
    ORDER BY clientes.nome_fantasia ASC;`;
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
    const query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", cliente_localizacao.cep AS "CEP", cliente_localizacao.cidade AS "Cidade", cliente_localizacao.uf AS "UF", cliente_localizacao.bairro AS "Bairro", cliente_localizacao.numero AS "Número", cliente_localizacao.endereco AS "Endereço", cliente_localizacao.complemento AS "Complemento" FROM clientes.cliente_localizacao JOIN clientes.clientes ON cliente_localizacao.cliente_id = clientes.id  
    WHERE clientes.cnpj = $1;
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
    query = `UPDATE clientes.cliente_localizacao SET cep = $1, cidade = $2, uf = $3, bairro = $4, numero = $5, endereco = $6, complemento = $7 WHERE cliente_localizacao.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $8) RETURNING *`;

    values = [
      localizacao.cep,
      localizacao.cidade,
      localizacao.uf,
      localizacao.bairro,
      localizacao.numero,
      localizacao.endereco,
      localizacao.complemento,
      cnpj,
    ];

    item = await db.query(query, values);
    
    const data = [
      item.rows[0]["id"],
      item.rows[0]["cliente_id"],
      item.rows[0]["cep"],
      item.rows[0]["cidade"],
      item.rows[0]["uf"],
      item.rows[0]["bairro"],
      item.rows[0]["numero"],
      item.rows[0]["endereco"],
      item.rows[0]["complemento"],
    ];

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [userId, item.rows[0]['cliente_id'], data, "Atualizado", "Localização"];

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
