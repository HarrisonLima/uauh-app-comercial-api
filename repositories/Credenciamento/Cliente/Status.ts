import db from "../../../database";

const validatorRepository = require("../../../validators/isValidNextStatus");
const moment = require("moment");

const getStatus = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT 
      clientes.cnpj AS "CNPJ", 
      clientes.nome_fantasia AS "Nome fantasia", 
      status.status AS "Status",
      usuarios.nome AS "Credenciador",
      usuarios.usuario AS "Usuário credenciador",
      cliente_credenciador.data AS "Data de criação",
      CASE 
          WHEN status.status IN ('Aprovado', 'Excluído') THEN usuarios_aprovador.nome
          ELSE NULL
      END AS "Aprovador",
      CASE 
          WHEN status.status IN ('Aprovado', 'Excluído') THEN usuarios_aprovador.usuario
          ELSE NULL
      END AS "Usuário aprovador",
      CASE 
          WHEN status.status IN ('Aprovado', 'Excluído') THEN cliente_aprovacao.data
          ELSE NULL
      END AS "Data de aprovação"
    FROM 
      clientes.cliente_status
    JOIN 
      clientes.clientes ON cliente_status.cliente_id = clientes.id
    JOIN 
      cadastros.status ON cliente_status.status_id = status.id
    JOIN 
      clientes.cliente_credenciador ON cliente_status.cliente_id = cliente_credenciador.cliente_id
    JOIN 
      cadastros.usuarios AS usuarios ON cliente_credenciador.usuario_id = usuarios.id
    LEFT JOIN 
      clientes.cliente_aprovacao ON cliente_status.cliente_id = cliente_aprovacao.cliente_id 
      AND cliente_status.status_id = cliente_aprovacao.status_id
      AND cliente_aprovacao.data = (
        SELECT MAX(ca.data)
        FROM clientes.cliente_aprovacao ca
        WHERE ca.cliente_id = cliente_status.cliente_id
      )
    LEFT JOIN 
      cadastros.usuarios AS usuarios_aprovador ON cliente_aprovacao.usuario_id = usuarios_aprovador.id
    ORDER BY 
      clientes.nome_fantasia ASC;`;
    const { rows } = await db.query(query);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Nome fantasia"]: row["Nome fantasia"],
      Status: row.Status,
      Credenciador: `${row.Credenciador}(${row["Usuário credenciador"]})`,
      Aprovador:
        row.Aprovador === null
          ? null
          : `${row.Aprovador}(${row["Usuário aprovador"]})`,
      ["Data de criação"]: moment(row["Data de criação"]).format(
        "HH:mm:ss - DD/MM/YYYY"
      ),
      ["Data de aprovação"]:
        row["Data de aprovação"] === null
          ? null
          : moment(row["Data de aprovação"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectStatus = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT 
    clientes.cnpj AS "CNPJ", 
    clientes.nome_fantasia AS "Nome fantasia", 
    status.status AS "Status",
    usuarios.nome AS "Credenciador",
	usuarios.usuario AS "Usuário credenciador",
    cliente_credenciador.data AS "Data de criação",
    CASE 
        WHEN status.status IN ('Aprovado', 'Excluído') THEN usuarios_aprovador.nome
        ELSE NULL
    END AS "Aprovador",
	CASE 
        WHEN status.status IN ('Aprovado', 'Excluído') THEN usuarios_aprovador.usuario
        ELSE NULL
    END AS "Usuário aprovador",
    CASE 
        WHEN status.status IN ('Aprovado', 'Excluído') THEN cliente_aprovacao.data
        ELSE NULL
    END AS "Data de aprovação"
FROM 
    clientes.cliente_status
JOIN 
    clientes.clientes ON cliente_status.cliente_id = clientes.id
JOIN 
    cadastros.status ON cliente_status.status_id = status.id
JOIN 
    clientes.cliente_credenciador ON cliente_status.cliente_id = cliente_credenciador.cliente_id
JOIN 
    cadastros.usuarios AS usuarios ON cliente_credenciador.usuario_id = usuarios.id
LEFT JOIN 
    clientes.cliente_aprovacao ON cliente_status.cliente_id = cliente_aprovacao.cliente_id 
        AND cliente_status.status_id = cliente_aprovacao.status_id
LEFT JOIN 
    cadastros.usuarios AS usuarios_aprovador ON cliente_aprovacao.usuario_id = usuarios_aprovador.id
  WHERE clientes.cnpj = $1;
    ;`;
    const values = [cnpj];
    const { rows } = await db.query(query, values);

    const responseRows = rows.map((row: any) => ({
      CNPJ: row.CNPJ,
      ["Nome fantasia"]: row["Nome fantasia"],
      Status: row.Status,
      Credenciador: `${row.Credenciador}(${row["Usuário credenciador"]})`,
      Aprovador:
        row.Aprovador === null
          ? null
          : `${row.Aprovador}(${row["Usuário aprovador"]})`,
      ["Data de criação"]: moment(row["Data de criação"]).format(
        "HH:mm:ss - DD/MM/YYYY"
      ),
      ["Data de aprovação"]:
        row["Data de aprovação"] === null
          ? null
          : moment(row["Data de aprovação"]).format("HH:mm:ss - DD/MM/YYYY"),
    }));

    return responseRows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateStatus = async (cnpj: string, req: any, res: any) => {
  const status = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;
  try {
    const isValid = await validatorRepository.isValidNextStatusCliente(
      cnpj,
      status.status
    );

    if (isValid) {
      query = `UPDATE clientes.cliente_status SET status_id = (SELECT id FROM cadastros.status WHERE status.status = $1) WHERE cliente_status.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2 ) RETURNING *`;

      values = [status.status, cnpj];

      item = await db.query(query, values);

      query =
        "INSERT INTO clientes.registros_clientes_status (usuario_id, cliente_id, status_id) VALUES ($1, $2, $3) RETURNING *;";
      values = [userId, item.rows[0]["cliente_id"], item.rows[0]["status_id"]];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      if (status.status === "Aprovado" || status.status === "Excluído") {
        query = `INSERT INTO clientes.cliente_aprovacao (cliente_id, status_id, usuario_id) VALUES ((SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1), (SELECT id FROM cadastros.status WHERE status.status = $2), $3) RETURNING *`;
        values = [cnpj, status.status, userId];
        const aprovacao = await db.query(query, values);
        console.log("Registro aprovação: ", aprovacao.rows);
      }

      return registro.rows;
    } else {
      throw new Error("Não é possível atualizar para o estado requerido.");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

module.exports = {
  getStatus,
  selectStatus,
  updateStatus,
};
