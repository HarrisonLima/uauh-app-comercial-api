import db from "../../../database";
import isUniqueCredencialFilial from "../../../validators/isUniqueCredencialFilial";

const insertFilial = async (req: any, res: any): Promise<any> => {
  const filial = req[0];
  const userId = req[1];
  let query: string, values: any, item: any;

  try {
    const isValid = await isUniqueCredencialFilial(filial.matriz, filial.filial);

    if (isValid) {
      query =
        "INSERT INTO credenciais.credencial_filiais (matriz_id, filial_id) VALUES ((SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1), (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2)) RETURNING *;";
      values = [filial.matriz, filial.filial];
      item = await db.query(query, values);

      const data = [filial.matriz, filial.filial];

      query =
        "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), $3, $4, $5) RETURNING *;";
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
      ? await db.query("DELETE FROM credenciais.credencial_filiais WHERE id = $1;", [
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
    FROM credenciais.credencial_filiais cf
    JOIN credenciais.credenciais m ON cf.matriz_id = m.id 
    JOIN credenciais.credenciais f ON cf.filial_id = f.id 
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
    FROM credenciais.credencial_filiais cf
    JOIN credenciais.credenciais m ON cf.matriz_id = m.id 
    JOIN credenciais.credenciais f ON cf.filial_id = f.id 
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
      `SELECT credenciais.cnpj AS "CNPJ" FROM credenciais.credenciais WHERE credenciais.id = (SELECT credencial_filiais.matriz_id FROM credenciais.credencial_filiais WHERE credencial_filiais.filial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1));`;
    values = [cnpj];
    const matriz = await db.query(query, values);

    query = `DELETE FROM credenciais.credencial_filiais WHERE credencial_filiais.filial_id = (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $1)`;
    values = [cnpj];
    item = await db.query(query, values);

    query =
      "INSERT INTO credenciais.registros_credenciais (usuario_id, credencial_id, credencial_item, operacao, etapa_credenciamento) VALUES ($1, (SELECT id FROM credenciais.credenciais WHERE credenciais.cnpj = $2), $3, $4, $5) RETURNING *;";
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
