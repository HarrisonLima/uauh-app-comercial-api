import db from "../../database";
import isUniqueStatus from "../../validators/isUniqueStatus";

const insertStatus = async (req: any, res: any): Promise<any> => {
  const status = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueStatus(status.status);

    if (isValid) {
      query = `INSERT INTO cadastros.status (status) VALUES ($1) RETURNING *;`;
      values = [status.status];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["status"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_status (usuario_id, status_id, status, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
      values = [userId, item.rows[0].id, data, "Cadastrado"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      return registro.rows;
    } else {
      res.status(409).json("Item já cadastrado");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query(`DELETE FROM cadastros.status WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getStatus = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT id, status AS "Status", situacao AS "Situação" 
    FROM cadastros.status
    ORDER BY status ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectStatus = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT id, status AS "Status", situacao AS "Situação" 
    FROM cadastros.status
    WHERE id = $1;`;
    const values = [id];
    const { rows } = await db.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const updateStatus = async (id: number, req: any, res: any) => {
  const status = req[0];
  const userId = req[1];

  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.status SET status = $1, situacao = $2 WHERE id = $3 RETURNING *`;
    values = [status.status, status.situacao, id];
    item = await db.query(query, values);

    console.log(item);
    const data = [
      item.rows[0]["id"],
      item.rows[0]["status"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_status (usuario_id, status_id, status, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      status.situacao === "Inativo" ? "Inativado" : "Atualizado",
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

module.exports = {
  insertStatus,
  getStatus,
  selectStatus,
  updateStatus,
};
