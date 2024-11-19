import db from "../../../database";
import Produto from "./../../../models/Cadastro/Produto";

const insertCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const condicaoComercial = req[0];
  const userId = req[1];
  let query: string,
    values: any,
    item: any,
    registro: any,
    data: any,
    i: number;

  try {
    query =
      "INSERT INTO credenciais.credencial_condicoes_comerciais (credencial_id, apuracao, pagamento) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3) RETURNING *;";
    values = [
      condicaoComercial.credencial,
      condicaoComercial.apuracao,
      condicaoComercial.pagamento,
    ];
    item = await db.query(query, values);

    data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["apuracao"],
      item.rows[0]["pagamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Cadastrado",
      "Condição Comercial",
    ];

    registro = await db.query(query, values);
    console.log("Regisro: ", registro.rows);

    i = 1;

    while (i < condicaoComercial.produto.length) {
      query =
        "INSERT INTO credenciais.credencial_produtos (credencial_id, produto_id, taxa) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3) RETURNING *;";
      values = [
        condicaoComercial.credencial,
        condicaoComercial.produto[i - 1].id,
        condicaoComercial.produto[i - 1].taxa,
      ];

      item = await db.query(query, values);

      query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
      values = [condicaoComercial.produto[i - 1].id];

      const produto = await db.query(query, values);

      data = [
        item.rows[0]["id"],
        item.rows[0]["credencial_id"],
        produto.rows[0]["produto"],
        item.rows[0]["taxa"],
      ];

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [
        userId,
        item.rows[0]["credencial_id"],
        data,
        "Cadastrado",
        "Condição Comercial",
      ];

      registro = await db.query(query, values);
      console.log("Regisro: ", registro.rows);

      i++;
    }

    while (i < condicaoComercial.tarifa.length) {
      query =
        "INSERT INTO credenciais.credencial_tarifas (credencial_id, tarifa_id, valor, valor_minimo, valor_maximo, carencia, parcelas) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3, $4, $5, $6, $7) RETURNING *;";
      values = [
        condicaoComercial.credencial,
        condicaoComercial.tarifa[i - 1].id,
        condicaoComercial.tarifa[i - 1].valor,
        condicaoComercial.tarifa[i - 1].valorMin,
        condicaoComercial.tarifa[i - 1].valorMax,
        condicaoComercial.tarifa[i - 1].carencia,
        condicaoComercial.tarifa[i - 1].parcelas,
      ];

      item = await db.query(query, values);

      data = [
        item.rows[0]["id"],
        item.rows[0]["credencial_id"],
        item.rows[0]["tarifa_id"],
        item.rows[0]["valor"],
        item.rows[0]["valor_minimo"],
        item.rows[0]["valor_maximo"],
        item.rows[0]["carencia"],
        item.rows[0]["parcelas"],
      ];

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [
        userId,
        item.rows[0]["credencial_id"],
        data,
        "Cadastrado",
        "Condição Comercial",
      ];
      registro = await db.query(query, values);
      console.log("Regisro: ", registro.rows);

      i++;
    }

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(
          "DELETE FROM credenciais.credencial_condicoes_comerciais WHERE id = $1;",
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
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ",
    credenciais.nome_fantasia AS "Nome fantasia",
    produtos.produto AS "Produto",
    credencial_produtos.taxa AS "Taxa",
    credencial_tarifas.valor AS "Valor tarifa",
    credencial_tarifas.valor_minimo AS "Valor mínimo",
    credencial_tarifas.valor_maximo AS "Valor máximo",
    credencial_tarifas.carencia AS "Carência",
    credencial_tarifas.parcelas AS "Parcelas",
    credencial_condicoes_comerciais.apuracao AS "Apuração",
    credencial_condicoes_comerciais.pagamento AS "Pagamento"
FROM 
    credenciais.credenciais
JOIN 
    credenciais.credencial_produtos 
    ON credenciais.id = credencial_produtos.credencial_id
JOIN 
    cadastros.produtos 
    ON credencial_produtos.produto_id = produtos.id
JOIN 
    credenciais.credencial_tarifas 
    ON credenciais.id = credencial_tarifas.credencial_id
JOIN 
    credenciais.credencial_condicoes_comerciais 
    ON credenciais.id = credencial_condicoes_comerciais.credencial_id
ORDER BY 
    credenciais.nome_fantasia ASC;`;
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
    const query = `SELECT 
    credenciais.cnpj AS "CNPJ",
    credenciais.nome_fantasia AS "Nome fantasia",
    produtos.produto AS "Produto",
    credencial_produtos.taxa AS "Taxa",
    credencial_tarifas.valor AS "Valor tarifa",
    credencial_tarifas.valor_minimo AS "Valor mínimo",
    credencial_tarifas.valor_maximo AS "Valor máximo",
    credencial_tarifas.carencia AS "Carência",
    credencial_tarifas.parcelas AS "Parcelas",
    credencial_condicoes_comerciais.apuracao AS "Apuração",
    credencial_condicoes_comerciais.pagamento AS "Pagamento"
FROM 
    credenciais.credenciais
JOIN 
    credenciais.credencial_produtos 
    ON credenciais.id = credencial_produtos.credencial_id
JOIN 
    cadastros.produtos 
    ON credencial_produtos.produto_id = produtos.id
JOIN 
    credenciais.credencial_tarifas 
    ON credenciais.id = credencial_tarifas.credencial_id
JOIN 
    credenciais.credencial_condicoes_comerciais 
ON credenciais.id = credencial_condicoes_comerciais.credencial_id
    WHERE credenciais.cnpj = $1;
ORDER BY 
    credenciais.nome_fantasia ASC;`;
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

  let query: string,
    values: any,
    item: any,
    data: any,
    registro: any,
    i: number;
  try {
    query = `UPDATE credenciais.credencial_condicoes_comerciais SET apuracao = $1, pagamento = $2 WHERE credencial_condicoes_comerciais.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $3) RETURNING *`;

    values = [condicaoComercial.apuracao, condicaoComercial.pagamento, cnpj];

    item = await db.query(query, values);

    query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
    values = [condicaoComercial.produto];

    data = [
      item.rows[0]["id"],
      item.rows[0]["credencial_id"],
      item.rows[0]["apuracao"],
      item.rows[0]["pagamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      item.rows[0]["credencial_id"],
      data,
      "Atualizado",
      "Condição Comercial",
    ];

    registro = await db.query(query, values);
    console.log("Regisro: ", registro.rows);

    i = 1;

    while (i < condicaoComercial.produto.length) {
      query =
        "UPDATE credenciais.credencial_produtos SET credencial_produtos.taxa = $1 WHERE credencial_produtos.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = ) AND credencial_produtos.produto_id = $3 RETURNING *;";
      values = [
        condicaoComercial.produto[i - 1].taxa,
        condicaoComercial.credencial,
        condicaoComercial.produto[i - 1].id,
      ];

      item = await db.query(query, values);

      query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
      values = [condicaoComercial.produto[i - 1].id];

      const produto = await db.query(query, values);

      data = [
        item.rows[0]["id"],
        item.rows[0]["credencial_id"],
        produto.rows[0]["produto"],
        item.rows[0]["taxa"],
      ];

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [
        userId,
        item.rows[0]["credencial_id"],
        data,
        "Atualizado",
        "Condição Comercial",
      ];

      registro = await db.query(query, values);
      console.log("Regisro: ", registro.rows);

      i++;
    }

    while (i < condicaoComercial.tarifa.length) {
      query =
        "UPDATE credenciais.credencial_tarifas SET valor = $1, valor_minimo = $2, valor_maximo = $3, carencia = $4, parcelas = $5 WHERE credencial_tarifas.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $6) AND credencial_tarifas.credencial_id = (SELECT id FROM cadastros.tarifas WHERE tarifas.id = $7) RETURNING *;";
      values = [
        condicaoComercial.tarifa[i - 1].valor,
        condicaoComercial.tarifa[i - 1].valorMin,
        condicaoComercial.tarifa[i - 1].valorMax,
        condicaoComercial.tarifa[i - 1].carencia,
        condicaoComercial.tarifa[i - 1].parcelas,
        condicaoComercial.credencial,
        condicaoComercial.tarifa[i - 1].id,
      ];

      item = await db.query(query, values);

      data = [
        item.rows[0]["id"],
        item.rows[0]["credencial_id"],
        item.rows[0]["tarifa_id"],
        item.rows[0]["valor"],
        item.rows[0]["valor_minimo"],
        item.rows[0]["valor_maximo"],
        item.rows[0]["carencia"],
        item.rows[0]["parcelas"],
      ];

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [
        userId,
        item.rows[0]["credencial_id"],
        data,
        "Atualizado",
        "Condição Comercial",
      ];
      registro = await db.query(query, values);
      console.log("Regisro: ", registro.rows);

      i++;
    }

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
  const item_id = req[0];
  const tipo_item = req[1];
  const userId = req[2];
  let query: string, values: any, item: any;
  try {
    if (tipo_item === "Produto") {
      query = `SELECT 
      credenciais.cnpj AS "CNPJ",
      credenciais.nome_fantasia AS "Nome fantasia",
      produtos.produto AS "Produto",
      credencial_produtos.taxa AS "Taxa",
      credencial_tarifas.valor AS "Valor tarifa",
      credencial_tarifas.valor_minimo AS "Valor mínimo",
      credencial_tarifas.valor_maximo AS "Valor máximo",
      credencial_tarifas.carencia AS "Carência",
      credencial_tarifas.parcelas AS "Parcelas",
      credencial_condicoes_comerciais.apuracao AS "Apuração",
      credencial_condicoes_comerciais.pagamento AS "Pagamento"
      FROM 
      credenciais.credenciais
      JOIN 
      credenciais.credencial_produtos 
      ON credenciais.id = credencial_produtos.credencial_id
      JOIN 
      cadastros.produtos 
      ON credencial_produtos.produto_id = produtos.id
      JOIN 
      credenciais.credencial_tarifas 
      ON credenciais.id = credencial_tarifas.credencial_id
      JOIN 
      credenciais.credencial_condicoes_comerciais 
      ON credenciais.id = credencial_condicoes_comerciais.credencial_id
      WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1) AND produto_id = (SELECT id FROM cadastros.produtos WHERE produtos.id = $2)`;
    } else {
      query = `SELECT 
      credenciais.cnpj AS "CNPJ",
      credenciais.nome_fantasia AS "Nome fantasia",
      produtos.produto AS "Produto",
      credencial_produtos.taxa AS "Taxa",
      credencial_tarifas.valor AS "Valor tarifa",
      credencial_tarifas.valor_minimo AS "Valor mínimo",
      credencial_tarifas.valor_maximo AS "Valor máximo",
      credencial_tarifas.carencia AS "Carência",
      credencial_tarifas.parcelas AS "Parcelas",
      credencial_condicoes_comerciais.apuracao AS "Apuração",
      credencial_condicoes_comerciais.pagamento AS "Pagamento"
      FROM 
      credenciais.credenciais
      JOIN 
      credenciais.credencial_produtos 
      ON credenciais.id = credencial_produtos.credencial_id
      JOIN 
      cadastros.produtos 
      ON credencial_produtos.produto_id = produtos.id
      JOIN 
      credenciais.credencial_tarifas 
      ON credenciais.id = credencial_tarifas.credencial_id
      JOIN 
      credenciais.credencial_condicoes_comerciais 
      ON credenciais.id = credencial_condicoes_comerciais.credencial_id
      WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1) AND tarifa_id = (SELECT id FROM cadastros.tarifas WHERE tarifas.id = $2)`;
    }

    values = [cnpj, item_id];
    const condicaoComercial = await db.query(query, values);

    if (tipo_item === "Produto") {
      query = `DELETE FROM credenciais.credencial_produtos WHERE credencial_condicoes_comerciais.id = $1`;
    } else {
      query = `DELETE FROM credenciais.credencial_tarifas WHERE credencial_condicoes_comerciais.id = $1`;
    }
    values = [condicaoComercial.rows[0].id];
    item = await db.query(query, values);

    console.log(condicaoComercial.rows[0]);

    const data = [
      condicaoComercial.rows[0]["id"],
      condicaoComercial.rows[0]["cnpj"],
      condicaoComercial.rows[0]["nome_fantasia"],
      condicaoComercial.rows[0]["produto"],
      condicaoComercial.rows[0]["taxa"],
      condicaoComercial.rows[0]["valor"],
      condicaoComercial.rows[0]["valor_minimo"],
      condicaoComercial.rows[0]["valor_maximo"],
      condicaoComercial.rows[0]["carencia"],
      condicaoComercial.rows[0]["parcelas"],
      condicaoComercial.rows[0]["apuracao"],
      condicaoComercial.rows[0]["pagamento"],
    ];

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [
      userId,
      condicaoComercial.rows[0]["credencial_id"],
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
