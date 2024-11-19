import db from "../../database";
import isUniqueEquipamento from "../../validators/isUniqueEquipamento";

const insertEquipamento = async (req: any, res: any): Promise<any> => {
  const equipamento = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueEquipamento(equipamento.equipamento);

    if (isValid) {
      query = `INSERT INTO cadastros.equipamentos (equipamento) VALUES ($1) RETURNING *;`;
      values = [equipamento.equipamento];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["equipamento"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_equipamentos (usuario_id, equipamento_id, equipamento, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
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
      ? await db.query(`DELETE FROM cadastros.equipamentos WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
        res.status(500).json({ error });
    throw Error;
  }
};

const getEquipamentos = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT id, equipamento AS "Equipamento", situacao AS "Situação" 
    FROM cadastros.equipamentos
    ORDER BY equipamento ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error: ", error);
        res.status(500).json({ error });
    throw Error;
  }
};

const selectEquipamento = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT id, equipamento AS "Equipamento", situacao AS "Situação" 
    FROM cadastros.equipamentos
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

const updateEquipamento = async (id: number, req: any, res: any) => {
  const equipamento = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.equipamentos SET equipamento = $1, situacao = $2 WHERE id = $3 RETURNING *`;
    values = [equipamento.equipamento, equipamento.situacao, id];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["equipamento"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_equipamentos (usuario_id, equipamento_id, equipamento, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      equipamento.situacao === "Inativo" ? "Inativado" : "Atualizado",
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
  insertEquipamento,
  getEquipamentos,
  selectEquipamento,
  updateEquipamento,
};
