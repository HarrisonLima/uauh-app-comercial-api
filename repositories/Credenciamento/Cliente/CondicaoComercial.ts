import db from "../../../database";
import isUniqueCondicaoComercial from "./../../../validators/isUniqueCondicaoComercial/index";

const insertCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const condicaoComercial = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueCondicaoComercial(
      condicaoComercial.cliente,
      condicaoComercial.produto
    );

    if (isValid) {
      query =
        "INSERT INTO clientes.cliente_condicoes_comerciais (cliente_id, produto_id, tipo_pagamento, faturamento, rede, saque_incluso, apuracao, pagamento, taxa, limite, adesao, emissao, segunda_via) VALUES ((SELECT id FROM clientes.clientes WHERE cnpj = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;";
      values = [
        condicaoComercial.cliente,
        condicaoComercial.produto,
        condicaoComercial.tipoPagamento,
        condicaoComercial.faturamento,
        condicaoComercial.rede,
        condicaoComercial.saqueIncluso,
        condicaoComercial.apuracao,
        condicaoComercial.pagamento,
        condicaoComercial.taxa,
        condicaoComercial.limite,
        condicaoComercial.adesao,
        condicaoComercial.emissao,
        condicaoComercial.segundaVia,
      ];
      item = await db.query(query, values);

      query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
      values = [condicaoComercial.produto];

      const produto = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["cliente_id"],
        item.rows[0]["produto_id"],
        produto.rows[0]["produto"],
        item.rows[0]["tipo_pagamento"],
        item.rows[0]["faturamento"],
        item.rows[0]["rede"],
        item.rows[0]["saque_incluso"],
        item.rows[0]["apuracao"],
        item.rows[0]["pagamento"],
        item.rows[0]["taxa"],
        item.rows[0]["limite"],
        item.rows[0]["adesao"],
        item.rows[0]["emissao"],
        item.rows[0]["segunda_via"],
      ];

      query =
        "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [
        userId,
        item.rows[0]["cliente_id"],
        data,
        "Cadastrado",
        "Condição Comercial",
      ];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      return registro.rows;
    } else {
      throw new Error("Produto já vinculado!");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM clientes.cliente_condicoes_comerciais WHERE id = $1;",
          [item.rows[0].id]
        )
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getCondicoesComerciais = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", produtos.produto AS "Produto", cliente_condicoes_comerciais.tipo_pagamento AS "Tipo pagamento", cliente_condicoes_comerciais.faturamento AS "Faturamento", cliente_condicoes_comerciais.rede AS "Rede", cliente_condicoes_comerciais.saque_incluso AS "Saque incluso?", cliente_condicoes_comerciais.apuracao AS "Apuração", cliente_condicoes_comerciais.pagamento AS "Pagamento", cliente_condicoes_comerciais.taxa AS "Taxa", cliente_condicoes_comerciais.limite AS "Limite", cliente_condicoes_comerciais.adesao AS "Adesão", cliente_condicoes_comerciais.emissao AS "Emissão", cliente_condicoes_comerciais.segunda_via AS "Segunda via" FROM clientes.cliente_condicoes_comerciais 
    JOIN cadastros.produtos ON cliente_condicoes_comerciais.produto_id = produtos.id 
    JOIN clientes.clientes ON cliente_condicoes_comerciais.cliente_id = clientes.id 
    ORDER BY produtos.produto ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectCondicaoComercial = async (
  cnpj: string,
  res: any
): Promise<any> => {
  try {
    const query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", produtos.produto AS "Produto", cliente_condicoes_comerciais.tipo_pagamento AS "Tipo pagamento", cliente_condicoes_comerciais.faturamento AS "Faturamento", cliente_condicoes_comerciais.rede AS "Rede", cliente_condicoes_comerciais.saque_incluso AS "Saque incluso?", cliente_condicoes_comerciais.apuracao AS "Apuração", cliente_condicoes_comerciais.pagamento AS "Pagamento", cliente_condicoes_comerciais.taxa AS "Taxa", cliente_condicoes_comerciais.limite AS "Limite", cliente_condicoes_comerciais.adesao AS "Adesão", cliente_condicoes_comerciais.emissao AS "Emissão", cliente_condicoes_comerciais.segunda_via AS "Segunda via" FROM clientes.cliente_condicoes_comerciais 
    JOIN cadastros.produtos ON cliente_condicoes_comerciais.produto_id = produtos.id 
    JOIN clientes.clientes ON cliente_condicoes_comerciais.cliente_id = clientes.id  
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

const updateCondicaoComercial = async (cnpj: string, req: any, res: any) => {
  const condicaoComercial = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE clientes.cliente_condicoes_comerciais SET tipo_pagamento = $1, faturamento = $2, rede = $3, saque_incluso = $4, apuracao = $5, pagamento = $6, taxa = $7, limite = $8, adesao = $9, emissao = $10, segunda_via = $11 WHERE cliente_condicoes_comerciais.produto_id = $12 AND cliente_condicoes_comerciais.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $13) RETURNING *`;

    values = [
      condicaoComercial.tipoPagamento,
      condicaoComercial.faturamento,
      condicaoComercial.rede,
      condicaoComercial.saqueIncluso,
      condicaoComercial.apuracao,
      condicaoComercial.pagamento,
      condicaoComercial.taxa,
      condicaoComercial.limite,
      condicaoComercial.adesao,
      condicaoComercial.emissao,
      condicaoComercial.segundaVia,
      condicaoComercial.produto,
      cnpj,
    ];

    item = await db.query(query, values);

    query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
    values = [condicaoComercial.produto];

    const produto = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["cliente_id"],
      item.rows[0]["produto_id"],
      produto.rows[0]["produto"],
      item.rows[0]["tipo_pagamento"],
      item.rows[0]["faturamento"],
      item.rows[0]["rede"],
      item.rows[0]["saque_incluso"],
      item.rows[0]["apuracao"],
      item.rows[0]["pagamento"],
      item.rows[0]["taxa"],
      item.rows[0]["limite"],
      item.rows[0]["adesao"],
      item.rows[0]["emissao"],
      item.rows[0]["segunda_via"],
    ];

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["cliente_id"],
      data,
      "Atualizado",
      "Condição Comercial",
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

const deleteCondicaoComercial = async (
  cnpj: string,
  req: any,
  res: any
): Promise<any> => {
  const produto = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;
  try {
    query = `SELECT cliente_condicoes_comerciais.id, cliente_condicoes_comerciais.cliente_id, produtos.id AS "produto_id", produtos.produto AS "produto", cliente_condicoes_comerciais.tipo_pagamento, cliente_condicoes_comerciais.faturamento, cliente_condicoes_comerciais.rede, cliente_condicoes_comerciais.saque_incluso, cliente_condicoes_comerciais.apuracao, cliente_condicoes_comerciais.pagamento, cliente_condicoes_comerciais.taxa, cliente_condicoes_comerciais.limite, cliente_condicoes_comerciais.adesao, cliente_condicoes_comerciais.emissao, cliente_condicoes_comerciais.segunda_via FROM clientes.cliente_condicoes_comerciais 
    JOIN cadastros.produtos ON cliente_condicoes_comerciais.produto_id = produtos.id 
    WHERE cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1) AND produto_id = (SELECT id FROM cadastros.produtos WHERE produtos.id = $2)`;
    values = [cnpj, produto];
    const condicaoComercial = await db.query(query, values);

    query = `DELETE FROM clientes.cliente_condicoes_comerciais WHERE cliente_condicoes_comerciais.id = $1`;
    values = [condicaoComercial.rows[0].id];
    item = await db.query(query, values);

    const data = [
      condicaoComercial.rows[0]["id"],
      condicaoComercial.rows[0]["cliente_id"],
      condicaoComercial.rows[0]["produto_id"],
      condicaoComercial.rows[0]["produto"],
      condicaoComercial.rows[0]["tipo_pagamento"],
      condicaoComercial.rows[0]["faturamento"],
      condicaoComercial.rows[0]["rede"],
      condicaoComercial.rows[0]["saque_incluso"],
      condicaoComercial.rows[0]["apuracao"],
      condicaoComercial.rows[0]["pagamento"],
      condicaoComercial.rows[0]["taxa"],
      condicaoComercial.rows[0]["limite"],
      condicaoComercial.rows[0]["adesao"],
      condicaoComercial.rows[0]["emissao"],
      condicaoComercial.rows[0]["segunda_via"],
    ];

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      condicaoComercial.rows[0]["cliente_id"],
      data,
      "Excluído",
      "Condição Comercial",
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
  insertCondicaoComercial,
  getCondicoesComerciais,
  selectCondicaoComercial,
  updateCondicaoComercial,
  deleteCondicaoComercial,
};
