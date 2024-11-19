import db from "../../database";
import isUniqueTarifa from "../../validators/isUniqueTarifa";

const insertTarifa = async (req: any, res: any): Promise<any> => {
  const tarifa = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueTarifa(tarifa.tarifa);

    if (isValid) {
      query = `INSERT INTO cadastros.tarifas (tarifa) VALUES ($1) RETURNING *;`;
      values = [tarifa.tarifa];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["tarifa"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_tarifas (usuario_id, tarifa_id, tarifa, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
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
      ? await db.query(`DELETE FROM cadastros.tarifas WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
        res.status(500).json({ error });
    throw Error;
  }
};

const getTarifas = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT id, tarifa AS "Tarifa", situacao AS "Situação" 
    FROM cadastros.tarifas
    ORDER BY tarifa ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error: ", error);
        res.status(500).json({ error });
    throw Error;
  }
};

const selectTarifa = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT id, tarifa AS "Tarifa", situacao AS "Situação" 
    FROM cadastros.tarifas
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

const updateTarifa = async (id: number, req: any, res: any) => {
  const tarifa = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.tarifas SET tarifa = $1, situacao = $2 WHERE id = $3 RETURNING *`;
    values = [tarifa.tarifa, tarifa.situacao, id];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["tarifa"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_tarifas (usuario_id, tarifa_id, tarifa, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      tarifa.situacao === "Inativo" ? "Inativado" : "Atualizado",
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
  insertTarifa,
  getTarifas,
  selectTarifa,
  updateTarifa,
};
