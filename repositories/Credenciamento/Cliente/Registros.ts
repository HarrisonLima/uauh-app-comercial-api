import moment from "moment";
import db from "../../../database";

const getRegistros = async (_: any, res: any): Promise<any | undefined> => {
  let query;

  try {
    query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário", registros_clientes.cliente_item AS "Item", registros_clientes.operacao AS "Operação", registros_clientes.etapa_credenciamento AS "Etapa", registros_clientes.data AS "Data" 
    FROM clientes.registros_clientes 
    JOIN 
    clientes.clientes ON registros_clientes.cliente_id = clientes.id
JOIN 
    cadastros.usuarios ON registros_clientes.usuario_id = usuarios.id
    ORDER BY 
    registros_clientes.data DESC;`;
    const credenciamento = await db.query(query);

    const credenciamentoRows = credenciamento.rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Nome fantasia"]: row["Nome fantasia"],
      ["Usuário"]: `${row["Nome"]} (${row["Usuário"]})`,
      ["Item"]: row["Item"],
      ["Operação"]: `${row["Operação"]} ${row["Etapa"]}`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    query = `SELECT clientes.cnpj AS "CNPJ", clientes.nome_fantasia AS "Nome fantasia", usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário", status.status AS "Status", registros_clientes_status.data AS "Data" 
    FROM clientes.registros_clientes_status 
    JOIN 
    clientes.clientes ON registros_clientes_status.cliente_id = clientes.id
    JOIN 
    cadastros.usuarios ON registros_clientes_status.usuario_id = usuarios.id
    JOIN 
    cadastros.status ON registros_clientes_status.status_id = status.id
    ORDER BY 
    registros_clientes_status.data DESC;`;
    const status = await db.query(query);

    const statusRows = status.rows
      .filter((row: any) => {
        const invalidStatuses = [
          "Retornado",
          "Reprovado",
          "Exclusão reprovada",
          "Em exclusão",
        ];
        return !invalidStatuses.includes(row["Status"]);
      })
      .map((row: any) => ({
        CNPJ: row.CNPJ,
        ["Nome fantasia"]: row["Nome fantasia"],
        ["Usuário"]: `${row["Nome"]} (${row["Usuário"]})`,
        ["Status"]: row["Status"],
        ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
      }));

    query = `SELECT 
    clientes.cnpj AS "CNPJ", 
    clientes.nome_fantasia AS "Nome fantasia", 
    usuarios_remanejador.nome AS "Nome remanejador",
    usuarios_remanejador.usuario AS "Remanejador",
    usuarios_remanejado.nome AS "Nome remanejado",
    usuarios_remanejado.usuario AS "Remanejado",
    registros_clientes_remanejamento.data AS "Data" 
FROM 
    clientes.registros_clientes_remanejamento 
JOIN 
    clientes.clientes ON registros_clientes_remanejamento.cliente_id = clientes.id
JOIN 
    cadastros.usuarios AS usuarios_remanejador ON registros_clientes_remanejamento.usuario_id = usuarios_remanejador.id
JOIN 
    cadastros.usuarios AS usuarios_remanejado ON registros_clientes_remanejamento.usuario_remanejado_id = usuarios_remanejado.id
ORDER BY 
    registros_clientes_remanejamento.data DESC`;
    const remanejamento = await db.query(query);

    const remanejamentoRows = remanejamento.rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Usuário remanejador"]: `${row["Nome remanejador"]} (${row["Remanejador"]})`,
      ["Usuário remanejado"]: `${row["Nome remanejado"]} (${row["Remanejado"]})`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return [
      { credenciamento: credenciamentoRows },
      { status: statusRows },
      { remanejamento: remanejamentoRows },
    ];
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectRegistros = async (cnpj: string, res: any): Promise<any> => {
  let query, values;

  try {
    query = `SELECT usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário", registros_clientes.cliente_item AS "Item", registros_clientes.operacao AS "Operação", registros_clientes.etapa_credenciamento AS "Etapa", registros_clientes.data AS "Data" 
    FROM clientes.registros_clientes 
    JOIN 
    clientes.clientes ON registros_clientes.cliente_id = clientes.id
JOIN 
    cadastros.usuarios ON registros_clientes.usuario_id = usuarios.id
    WHERE clientes.cnpj = $1
    ORDER BY 
    registros_clientes.data DESC;`;
    values = [cnpj];

    const credenciamento = await db.query(query, values);

    const credenciamentoRows = credenciamento.rows.map((row: any) => ({
      ["Usuário"]: `${row["Nome"]} (${row["Usuário"]})`,
      ["Item"]: row["Item"],
      ["Operação"]: `${row["Operação"]} ${row["Etapa"]}`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    query = `SELECT usuarios.nome AS "Nome",
    usuarios.usuario AS "Usuário", status.status AS "Status", registros_clientes_status.data AS "Data" 
    FROM clientes.registros_clientes_status 
    JOIN 
    clientes.clientes ON registros_clientes_status.cliente_id = clientes.id
    JOIN 
    cadastros.usuarios ON registros_clientes_status.usuario_id = usuarios.id
    JOIN 
    cadastros.status ON registros_clientes_status.status_id = status.id
    WHERE clientes.cnpj = $1
    ORDER BY 
    registros_clientes_status.data DESC;`;

    const status = await db.query(query, values);

    const statusRows = status.rows
      .filter((row: any) => {
        const invalidStatuses = [
          "Retornado",
          "Reprovado",
          "Exclusão reprovada",
          "Em exclusão",
        ];
        return !invalidStatuses.includes(row["Status"]);
      })
      .map((row: any) => ({
        ["Usuário"]: `${row["Nome"]} (${row["Usuário"]})`,
        ["Status"]: row["Status"],
        ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
      }));

    query = `SELECT usuarios.nome AS "Nome", usuarios.usuario AS "Usuário", status.status AS "Status", registros_clientes_justificativas.justificativa AS "Justificativa", registros_clientes_justificativas.data AS "Data" 
    FROM clientes.registros_clientes_justificativas
    JOIN 
    clientes.clientes ON registros_clientes_justificativas.cliente_id = clientes.id
    JOIN 
    cadastros.usuarios ON registros_clientes_justificativas.usuario_id = usuarios.id
    JOIN 
    cadastros.status ON registros_clientes_justificativas.status_id = status.id
    WHERE clientes.cnpj = $1
    ORDER BY 
    registros_clientes_justificativas.data DESC;`;
    values = [cnpj];
    const justificativa = await db.query(query, values);

    const justificativaRows = justificativa.rows.map((row: any) => ({
      ["Usuário"]: `${row["Nome"]} (${row["Usuário"]})`,
      ["Status"]: row["Status"],
      ["Justificativa"]: row["Justificativa"],
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    query = `SELECT 
    usuarios_remanejador.nome AS "Nome remanejador",
    usuarios_remanejador.usuario AS "Remanejador",
    usuarios_remanejado.nome AS "Nome remanejado",
    usuarios_remanejado.usuario AS "Remanejado",
    registros_clientes_remanejamento.data AS "Data" 
FROM 
    clientes.registros_clientes_remanejamento 
JOIN 
    clientes.clientes ON registros_clientes_remanejamento.cliente_id = clientes.id
JOIN 
    cadastros.usuarios AS usuarios_remanejador ON registros_clientes_remanejamento.usuario_id = usuarios_remanejador.id
JOIN 
    cadastros.usuarios AS usuarios_remanejado ON registros_clientes_remanejamento.usuario_remanejado_id = usuarios_remanejado.id
    WHERE clientes.cnpj = $1
ORDER BY 
    registros_clientes_remanejamento.data DESC`;
    const remanejamento = await db.query(query, values);

    const remanejamentoRows = remanejamento.rows.map((row: any) => ({
      ["Usuário remanejador"]: `${row["Nome remanejador"]} (${row["Remanejador"]})`,
      ["Usuário remanejado"]: `${row["Nome remanejado"]} (${row["Remanejado"]})`,
      ["Data"]: moment(row["Data"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return [
      { credenciamento: credenciamentoRows },
      { status: statusRows },
      { justificativa: justificativaRows },
      { remanejamento: remanejamentoRows },
    ];
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

module.exports = {
  getRegistros,
  selectRegistros,
};
