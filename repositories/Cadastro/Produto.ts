import db from "../../database";
import isUniqueProduto from "../../validators/isUniqueProduto";

const insertProduto = async (req: any, res: any): Promise<any> => {
  const produto = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueProduto(produto.produto);

    if (isValid) {
      query = `INSERT INTO cadastros.produtos (produto) VALUES ($1) RETURNING *;`;
      values = [produto.produto];
      item = await db.query(query, values);

      const data = [
        item.rows[0]["id"],
        item.rows[0]["produto"],
        item.rows[0]["situacao"],
      ];

      query = `INSERT INTO cadastros.registros_produtos (usuario_id, produto_id, produto, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
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
      ? await db.query(`DELETE FROM cadastros.produtos WHERE id = $1;`, [
          item.rows[0].id,
        ])
      : null;
        res.status(500).json({ error });
    throw Error;
  }
};

const getProdutos = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT id, produto AS "Produto", situacao AS "Situação" 
    FROM cadastros.produtos
    ORDER BY produto ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error: ", error);
        res.status(500).json({ error });
    throw Error;
  }
};

const selectProduto = async (id: number, res: any): Promise<any> => {
  try {
    const query = `SELECT id, produto AS "Produto", situacao AS "Situação" 
    FROM cadastros.produtos
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

const updateProduto = async (id: number, req: any, res: any) => {
  const produto = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.produtos SET produto = $1, situacao = $2 WHERE id = $3 RETURNING *`;
    values = [produto.produto, produto.situacao, id];
    item = await db.query(query, values);

    const data = [
      item.rows[0]["id"],
      item.rows[0]["produto"],
      item.rows[0]["situacao"],
    ];

    query = `INSERT INTO cadastros.registros_produtos (usuario_id, produto_id, produto, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [
      userId,
      item.rows[0].id,
      data,
      produto.situacao === "Inativo" ? "Inativado" : "Atualizado",
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
  insertProduto,
  getProdutos,
  selectProduto,
  updateProduto,
};
