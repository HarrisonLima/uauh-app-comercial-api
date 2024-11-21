import db from "../../../database";

const insertCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const condicaoComercial = req[0];
  const userId = req[1];
  let query: string,
    values: any,
    item: any,
    registro: any,
    data: any,
    i: number,
    j: number;

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

    while (i <= condicaoComercial.produto.length) {
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

    j = 1;

    while (j <= condicaoComercial.tarifa.length) {
      query =
        "INSERT INTO credenciais.credencial_tarifas (credencial_id, tarifa_id, valor, valor_minimo, valor_maximo, carencia, parcelas) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3, $4, $5, $6, $7) RETURNING *;";
      values = [
        condicaoComercial.credencial,
        condicaoComercial.tarifa[j - 1].id,
        condicaoComercial.tarifa[j - 1].valor,
        condicaoComercial.tarifa[j - 1].valorMin,
        condicaoComercial.tarifa[j - 1].valorMax,
        condicaoComercial.tarifa[j - 1].carencia,
        condicaoComercial.tarifa[j - 1].parcelas,
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

      j++;
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
    const query = `
    SELECT 
      credenciais.cnpj AS "CNPJ",
      credenciais.nome_fantasia AS "Nome fantasia",
      produtos.produto AS "Produto",
      credencial_produtos.taxa AS "Taxa",
      tarifas.tarifa AS "Tarifa",
      credencial_tarifas.valor AS "Valor tarifa",
      credencial_tarifas.valor_minimo AS "Valor mínimo",
      credencial_tarifas.valor_maximo AS "Valor máximo",
      credencial_tarifas.carencia AS "Carência",
      credencial_tarifas.parcelas AS "Parcelas",
      credencial_condicoes_comerciais.apuracao AS "Apuração",
      credencial_condicoes_comerciais.pagamento AS "Pagamento"
    FROM 
      credenciais.credenciais
    LEFT JOIN 
      credenciais.credencial_produtos 
      ON credenciais.id = credencial_produtos.credencial_id
    LEFT JOIN 
      cadastros.produtos 
      ON credencial_produtos.produto_id = produtos.id
    LEFT JOIN 
      credenciais.credencial_tarifas
      ON credenciais.id = credencial_tarifas.credencial_id
    LEFT JOIN 
      cadastros.tarifas 
      ON credencial_tarifas.tarifa_id = tarifas.id
    LEFT JOIN 
      credenciais.credencial_condicoes_comerciais 
      ON credenciais.id = credencial_condicoes_comerciais.credencial_id
  `;
    const { rows } = await db.query(query);

    const result = rows.reduce((acc: any, row: any) => {
      const { CNPJ: cnpj, "Nome fantasia": nomeFantasia } = row;
      if (!acc.cnpj) {
        acc.cnpj = cnpj;
        acc.nomeFantasia = nomeFantasia;
        acc.produtos = [];
        acc.tarifas = [];
        acc.informacoes = [];
      }
      if (
        row.Produto &&
        !acc.produtos.some((p: any) => p.produto === row.Produto)
      ) {
        acc.produtos.push({
          produto: row.Produto,
          taxa: row.Taxa,
        });
      }

      if (
        row.Tarifa &&
        !acc.tarifas.some((t: any) => t.tarifa === row.Tarifa)
      ) {
        acc.tarifas.push({
          tarifa: row.Tarifa,
          valor: row["Valor tarifa"],
          valorMinimo: row["Valor mínimo"],
          valorMaximo: row["Valor máximo"],
          carencia: row.Carência,
          parcelas: row.Parcelas,
        });
      }

      if (row["Apuração"] || row["Pagamento"]) {
        acc.informacoes.push({
          apuracao: row["Apuração"],
          pagamento: row["Pagamento"],
        });
      }

      return acc;
    }, {});

    return result;
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
    const query = `
    SELECT 
      credenciais.cnpj AS "CNPJ",
      credenciais.nome_fantasia AS "Nome fantasia",
      produtos.produto AS "Produto",
      credencial_produtos.taxa AS "Taxa",
      tarifas.tarifa AS "Tarifa",
      credencial_tarifas.valor AS "Valor tarifa",
      credencial_tarifas.valor_minimo AS "Valor mínimo",
      credencial_tarifas.valor_maximo AS "Valor máximo",
      credencial_tarifas.carencia AS "Carência",
      credencial_tarifas.parcelas AS "Parcelas",
      credencial_condicoes_comerciais.apuracao AS "Apuração",
      credencial_condicoes_comerciais.pagamento AS "Pagamento"
    FROM 
      credenciais.credenciais
    LEFT JOIN 
      credenciais.credencial_produtos 
      ON credenciais.id = credencial_produtos.credencial_id
    LEFT JOIN 
      cadastros.produtos 
      ON credencial_produtos.produto_id = produtos.id
    LEFT JOIN 
      credenciais.credencial_tarifas
      ON credenciais.id = credencial_tarifas.credencial_id
    LEFT JOIN 
      cadastros.tarifas 
      ON credencial_tarifas.tarifa_id = tarifas.id
    LEFT JOIN 
      credenciais.credencial_condicoes_comerciais 
      ON credenciais.id = credencial_condicoes_comerciais.credencial_id
    WHERE credenciais.cnpj = $1
    ORDER BY 
      credenciais.nome_fantasia ASC;
  `;

    const values = [cnpj];
    const { rows } = await db.query(query, values);

    const result = rows.reduce((acc: any, row: any) => {
      const { CNPJ: cnpj, "Nome fantasia": nomeFantasia } = row;

      if (!acc.cnpj) {
        acc.cnpj = cnpj;
        acc.nomeFantasia = nomeFantasia;
        acc.produtos = [];
        acc.tarifas = [];
        acc.informacoes = [];
      }

      if (
        row.Produto &&
        !acc.produtos.some((p: any) => p.produto === row.Produto)
      ) {
        acc.produtos.push({
          produto: row.Produto,
          taxa: row.Taxa,
        });
      }

      if (
        row.Tarifa &&
        !acc.tarifas.some((t: any) => t.tarifa === row.Tarifa)
      ) {
        acc.tarifas.push({
          tarifa: row.Tarifa,
          valor: row["Valor tarifa"],
          valorMinimo: row["Valor mínimo"],
          valorMaximo: row["Valor máximo"],
          carencia: row.Carência,
          parcelas: row.Parcelas,
        });
      }

      if (row["Apuração"] || row["Pagamento"]) {
        acc.informacoes.push({
          apuracao: row["Apuração"],
          pagamento: row["Pagamento"],
        });
      }

      return acc;
    }, {});

    return result;
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
    i: number,
    j: number;

  try {
    query = `UPDATE credenciais.credencial_condicoes_comerciais SET apuracao = $1, pagamento = $2 WHERE credencial_condicoes_comerciais.credencial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $3) RETURNING *`;

    values = [condicaoComercial.apuracao, condicaoComercial.pagamento, cnpj];

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
      "Atualizado",
      "Condição Comercial",
    ];

    registro = await db.query(query, values);
    console.log("Regisro: ", registro.rows);

    i = 0;

    while (i < condicaoComercial.produto.length) {
      query = `SELECT * FROM credenciais.credencial_produtos WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $1) AND produto_id = $2`;
      values = [cnpj, condicaoComercial.produto[i].id];
      const produtoExistente = await db.query(query, values);

      if (produtoExistente.rows.length > 0) {
        query =
          "UPDATE credenciais.credencial_produtos SET taxa = $1 WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $2) AND produto_id = $3 RETURNING *;";
        values = [
          condicaoComercial.produto[i].taxa,
          cnpj,
          condicaoComercial.produto[i].id,
        ];
        item = await db.query(query, values);
      } else {
        query =
          "INSERT INTO credenciais.credencial_produtos (credencial_id, produto_id, taxa) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3) RETURNING *;";
        values = [
          cnpj,
          condicaoComercial.produto[i].id,
          condicaoComercial.produto[i].taxa,
        ];
        item = await db.query(query, values);
      }

      query = `SELECT produto FROM cadastros.produtos WHERE id = $1;`;
      values = [condicaoComercial.produto[i].id];

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

    j = 0;

    while (j < condicaoComercial.tarifa.length) {
      query = `SELECT * FROM credenciais.credencial_tarifas WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $1) AND tarifa_id = $2`;
      values = [cnpj, condicaoComercial.tarifa[j].id];
      const tarifaExistente = await db.query(query, values);

      if (tarifaExistente.rows.length > 0) {
        query =
          "UPDATE credenciais.credencial_tarifas SET valor = $1, valor_minimo = $2, valor_maximo = $3, carencia = $4, parcelas = $5 WHERE credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $6) AND tarifa_id = $7 RETURNING *;";
        values = [
          condicaoComercial.tarifa[j].valor,
          condicaoComercial.tarifa[j].valorMin,
          condicaoComercial.tarifa[j].valorMax,
          condicaoComercial.tarifa[j].carencia,
          condicaoComercial.tarifa[j].parcelas,
          cnpj,
          condicaoComercial.tarifa[j].id,
        ];
        item = await db.query(query, values);
      } else {
        query =
          "INSERT INTO credenciais.credencial_tarifas (credencial_id, tarifa_id, valor, valor_minimo, valor_maximo, carencia, parcelas) VALUES ((SELECT id FROM credenciais.credenciais WHERE cnpj = $1), $2, $3, $4, $5, $6, $7) RETURNING *;";
        values = [
          cnpj,
          condicaoComercial.tarifa[j].id,
          condicaoComercial.tarifa[j].valor,
          condicaoComercial.tarifa[j].valorMin,
          condicaoComercial.tarifa[j].valorMax,
          condicaoComercial.tarifa[j].carencia,
          condicaoComercial.tarifa[j].parcelas,
        ];
        item = await db.query(query, values);
      }

      query = `SELECT tarifa FROM cadastros.tarifas WHERE id = $1;`;
      values = [condicaoComercial.tarifa[j].id];

      const tarifa = await db.query(query, values);

      data = [
        item.rows[0]["id"],
        item.rows[0]["credencial_id"],
        tarifa.rows[0]["tarifa"],
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
        tarifaExistente.rows.length > 0 ? "Atualizado" : "Inserido",
        "Condição Comercial",
      ];
      registro = await db.query(query, values);
      console.log("Regisro: ", registro.rows);

      j++;
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
  const tipoItem = req[0];
  const itemId = req[1];
  const userId = req[2];
  let query: string, values: any, item: any, data: any;
  try {
    if (tipoItem === "Produto") {
      query = `SELECT 
    credencial_condicoes_comerciais.id,
    credencial_condicoes_comerciais.credencial_id,
    produtos.produto,
    credencial_produtos.taxa,
    tarifas.tarifa,
    credencial_tarifas.valor,
    credencial_tarifas.valor_minimo,
    credencial_tarifas.valor_maximo,
    credencial_tarifas.carencia,
    credencial_tarifas.parcelas,
    credencial_condicoes_comerciais.apuracao,
    credencial_condicoes_comerciais.pagamento
FROM 
    credenciais.credenciais
JOIN 
    credenciais.credencial_condicoes_comerciais 
    ON credenciais.id = credencial_condicoes_comerciais.credencial_id
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
    cadastros.tarifas 
    ON credencial_tarifas.tarifa_id = tarifas.id
WHERE 
  credencial_produtos.credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $1)
  AND credencial_produtos.produto_id = (SELECT id FROM cadastros.produtos WHERE id = $2)`;
    } else {
      query = `SELECT 
    credencial_condicoes_comerciais.id,
    credencial_condicoes_comerciais.credencial_id,
    produtos.produto,
    credencial_produtos.taxa,
    tarifas.tarifa,
    credencial_tarifas.valor,
    credencial_tarifas.valor_minimo,
    credencial_tarifas.valor_maximo,
    credencial_tarifas.carencia,
    credencial_tarifas.parcelas,
    credencial_condicoes_comerciais.apuracao,
    credencial_condicoes_comerciais.pagamento
FROM 
    credenciais.credenciais
JOIN 
    credenciais.credencial_condicoes_comerciais 
    ON credenciais.id = credencial_condicoes_comerciais.credencial_id
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
    cadastros.tarifas 
    ON credencial_tarifas.tarifa_id = tarifas.id
WHERE credencial_tarifas.credencial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $1) 
    AND credencial_tarifas.tarifa_id = (SELECT id FROM cadastros.tarifas WHERE id = $2)`;
    }

    values = [cnpj, itemId];
    const condicaoComercial = await db.query(query, values);

    if (tipoItem === "Produto") {
      query = `DELETE FROM credenciais.credencial_produtos WHERE id = $1`;
    } else {
      query = `DELETE FROM credenciais.credencial_tarifas WHERE id = $1`;
    }
    values = [itemId];
    item = await db.query(query, values);

    if (tipoItem === "Produto") {
      data = [
        condicaoComercial.rows[0]["id"],
        condicaoComercial.rows[0]["produto"],
        condicaoComercial.rows[0]["taxa"],
      ];
    } else {
      data = [
        condicaoComercial.rows[0]["id"],
        condicaoComercial.rows[0]["tarifa"],
        condicaoComercial.rows[0]["valor"],
        condicaoComercial.rows[0]["valor_minimo"],
        condicaoComercial.rows[0]["valor_maximo"],
        condicaoComercial.rows[0]["carencia"],
        condicaoComercial.rows[0]["parcelas"],
      ];
    }

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
