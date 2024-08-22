import db from "../../../database";
import isUniqueClienteFilial from "../../../validators/isUniqueClienteFilial";

const insertFilial = async (req: any, res: any): Promise<any> => {
  const filial = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueClienteFilial(filial.matriz, filial.filial);

    if (isValid) {
      query =
        "INSERT INTO clientes.cliente_filiais (matriz_id, filial_id) VALUES ((SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1), (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2)) RETURNING *;";
      values = [filial.matriz, filial.filial];
      item = await db.query(query, values);

      const data = [filial.matriz, filial.filial];

      query =
        "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), $3, $4, $5) RETURNING *;";
      values = [userId, filial.filial, data, "Cadastrado", "Filial"];

      const registro = await db.query(query, values);
      console.log("Registro: ", registro.rows);

      return registro.rows;
    } else {
      res.status(409).json("Filial já cadastrada");
    }
  } catch (error: any) {
    console.error("Error: ", error);
    item.rows[0]
      ? await db.query("DELETE FROM clientes.cliente_filiais WHERE id = $1;", [
          item.rows[0].id,
        ])
      : null;
    res.status(500).json({ error });
    throw Error;
  }
};

const getFiliais = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const query = `SELECT m.cnpj AS "Matriz", f.cnpj AS "Filial" 
    FROM clientes.cliente_filiais cf
    JOIN clientes.clientes m ON cf.matriz_id = m.id 
    JOIN clientes.clientes f ON cf.filial_id = f.id 
    ORDER BY m.cnpj ASC;`;
    const { rows } = await db.query(query);

    return rows;
  } catch (error: any) {
    console.error("Error: ", error);
    res.status(500).json({ error });
    throw Error;
  }
};

const selectFilial = async (cnpj: string, res: any): Promise<any> => {
  try {
    const query = `SELECT m.cnpj AS "Matriz", f.cnpj AS "Filial" 
    FROM clientes.cliente_filiais cf
    JOIN clientes.clientes m ON cf.matriz_id = m.id 
    JOIN clientes.clientes f ON cf.filial_id = f.id 
    WHERE f.cnpj = $1;
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

const deleteFilial = async (cnpj: string, req: any, res: any): Promise<any> => {
  const userId = req;
  let query: string, values: any, item: any;
  try {
    query =
      `SELECT clientes.cnpj AS "CNPJ" FROM clientes.clientes WHERE clientes.id = (SELECT cliente_filiais.matriz_id FROM clientes.cliente_filiais WHERE cliente_filiais.filial_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1));`;
    values = [cnpj];
    const matriz = await db.query(query, values);

    query = `DELETE FROM clientes.cliente_filiais WHERE cliente_filiais.filial_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO clientes.registros_clientes (usuario_id, cliente_id, cliente_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $2), $3, $4, $5) RETURNING *;";
    values = [userId, cnpj, matriz.rows[0]["CNPJ"], "Excluído", "Filial"];

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
  insertFilial,
  getFiliais,
  selectFilial,
  deleteFilial,
};
