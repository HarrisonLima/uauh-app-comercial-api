import db from "../../../database";
import isUniqueCredencial from "./../../../validators/isUniqueCredencial";

const insertIdentificacao = async (req: any, res: any): Promise<any> => {
  const identificacao = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueCredencial(identificacao.cnpj);

    if (isValid) {
      query =
        "INSERT INTO credenciais.credenciais (simples_nacional, cnpj, razao_social, inscricao_estadual, ramo_atividade, nome_fantasia, telefone, email, email_financeiro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;";
      values = [
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

      query = `INSERT INTO credenciais.credencial_credenciador (credencial_id, usuario_id) VALUES ($1, $2) RETURNING *;`;
      values = [item.rows[0].id, userId];

      const credenciador = await db.query(query, values);
      console.log("Credenciador: ", credenciador.rows);

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
      values = [userId, item.rows[0].id, data, "Cadastrado", "Identificação"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      if (
        identificacao.matriz !== "" &&
        identificacao.matriz !== undefined &&
        identificacao.matriz !== null
      ) {
        query =
          "INSERT INTO credenciais.credencial_filiais (matriz_id, filial_id) VALUES ((SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1), (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2)) RETURNING *;";
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
      ? await db.query("DELETE FROM credenciais.credenciais WHERE id = $1;", [
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
    const query = `SELECT simples_nacional AS "Simples nacional", cnpj AS "CNPJ", razao_social AS "Razão social", inscricao_estadual AS "Inscrição estadual", ramo_atividade AS "Ramo atividade", nome_fantasia AS "Nome fantasia", telefone AS "Telefone", email AS "E-mail", email_financeiro AS "E-mail financeiro" FROM credenciais.credenciais 
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
    const query = `SELECT simples_nacional AS "Simples nacional", cnpj AS "CNPJ", razao_social AS "Razão social", inscricao_estadual AS "Inscrição estadual", ramo_atividade AS "Ramo atividade", nome_fantasia AS "Nome fantasia", telefone AS "Telefone", email AS "E-mail", email_financeiro AS "E-mail financeiro" FROM credenciais.credenciais  
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
    query = `UPDATE credenciais.credenciais SET simples_nacional = $1, razao_social = $2, inscricao_estadual = $3, ramo_atividade = $4, nome_fantasia = $5, telefone = $6, email = $7, email_financeiro = $8 WHERE cnpj = $9 RETURNING *`;

    values = [
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
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
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
