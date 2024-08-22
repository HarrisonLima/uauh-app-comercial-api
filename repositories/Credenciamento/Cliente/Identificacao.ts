import db from "../../../database";
import isUniqueCliente from "./../../../validators/isUniqueCliente";

const insertIdentificacao = async (req: any, res: any): Promise<any> => {
  const identificacao = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueCliente(identificacao.cnpj);

    if (isValid) {
      query =
        "INSERT INTO clientes.clientes (orgao_publico, simples_nacional, cnpj, razao_social, inscricao_estadual, ramo_atividade, nome_fantasia, telefone, email, email_financeiro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;";
      values = [
        identificacao.orgaoPublico,
        identificacao.simplesNacional,
        identificacao.cnpj,
        identificacao.razaoSocial,
        identificacao.inscricaoEstadual,
        identificacao.ramoAtividade,
        identificacao.nomeFantasia,
        identificacao.telefone,
        identificacao.email,
        identificacao.emailFinanceiro,
      ];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["orgao_publico"],
        item.rows[0]["simples_nacional"],
        item.rows[0]["cnpj"],
        item.rows[0]["razao_social"],
        item.rows[0]["inscricao_estadual"],
        item.rows[0]["ramo_atividade"],
        item.rows[0]["nome_fantasia"],
        item.rows[0]["telefone"],
        item.rows[0]["email"],
        item.rows[0]["email_financeiro"],
      ];

      query = `INSERT INTO clientes.cliente_credenciador (cliente_id, usuario_id) VALUES ($1, $2) RETURNING *;`;
      values = [item.rows[0].id, userId];

      const credenciador = await db.query(query, values);
      console.log("Credenciador: ", credenciador.rows);

      query =
        "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [userId, item.rows[0].id, data, "Cadastrado", "Identificação"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      if (
        identificacao.matriz !== "" &&
        identificacao.matriz !== undefined &&
        identificacao.matriz !== null
      ) {
        query =
          "INSERT INTO clientes.cliente_filiais (matriz_id, filial_id) VALUES ((SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1), (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2)) RETURNING *;";
        values = [identificacao.matriz, identificacao.cnpj];

        const registroFilial = await db.query(query, values);

        console.log(registroFilial.rows);
      }

      return registro;
    } else {
      res.status(409).json("Cliente já cadastrado");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query("DELETE FROM clientes.clientes WHERE id = $1;", [
          item.rows[0].id,
        ])
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getIdentificacoes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const query = `SELECT orgao_publico AS "Órgão público", simples_nacional AS "Simples nacional", cnpj AS "CNPJ", razao_social AS "Razão social", inscricao_estadual AS "Inscrição estadual", ramo_atividade AS "Ramo atividade", nome_fantasia AS "Nome fantasia", telefone AS "Telefone", email AS "E-mail", email_financeiro AS "E-mail financeiro" FROM clientes.clientes 
    ORDER BY nome_fantasia ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectIdentificacao = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT orgao_publico AS "Órgão público", simples_nacional AS "Simples nacional", cnpj AS "CNPJ", razao_social AS "Razão social", inscricao_estadual AS "Inscrição estadual", ramo_atividade AS "Ramo atividade", nome_fantasia AS "Nome fantasia", telefone AS "Telefone", email AS "E-mail", email_financeiro AS "E-mail financeiro" FROM clientes.clientes  
    WHERE cnpj = $1
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

const updateIdentificacao = async (cnpj: string, req: any, res: any) => {
  const identificacao = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    query = `UPDATE clientes.clientes SET orgao_publico = $1, simples_nacional = $2, razao_social = $3, inscricao_estadual = $4, ramo_atividade = $5, nome_fantasia = $6, telefone = $7, email = $8, email_financeiro = $9 WHERE cnpj = $10 RETURNING *`;

    values = [
      identificacao.orgaoPublico,
      identificacao.simplesNacional,
      identificacao.razaoSocial,
      identificacao.inscricaoEstadual,
      identificacao.ramoAtividade,
      identificacao.nomeFantasia,
      identificacao.telefone,
      identificacao.email,
      identificacao.emailFinanceiro,
      cnpj,
    ];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["orgao_publico"],
      item.rows[0]["simples_nacional"],
      item.rows[0]["cnpj"],
      item.rows[0]["razao_social"],
      item.rows[0]["inscricao_estadual"],
      item.rows[0]["ramo_atividade"],
      item.rows[0]["nome_fantasia"],
      item.rows[0]["telefone"],
      item.rows[0]["email"],
      item.rows[0]["email_financeiro"],
    ];
    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    values = [userId, item.rows[0].id, data, "Atualizado", "Identificação"];

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
  insertIdentificacao,
  getIdentificacoes,
  selectIdentificacao,
  updateIdentificacao,
};
