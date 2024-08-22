import db from "../../database";
import dotenv from "dotenv";
import Encrypt from "../../utilities/Encrypt";

dotenv.config();

const resetPassword = async (id: number, req: any) => {
  const password = Encrypt(process.env.PASSWORD_DEFAULT!);
  const userId = req;

  let query: string, values: any, item: any;

  try {
    query = `UPDATE cadastros.usuarios SET senha = $1 WHERE id = (SELECT id FROM cadastros.usuarios WHERE id = $2) RETURNING *`;
    values = [password ? password : process.env.PASSWORD_DEFAULT, id];

    item = await db.query(query, values);

    delete item.rows[0].senha;

    query = `INSERT INTO cadastros.registros_usuarios (usuario_id, usuario_modificado_id, usuario_modificado, operacao) VALUES ($1, $2, $3, $4) RETURNING *;`;
    values = [userId, item.rows[0].id, item.rows[0], "Atualizado senha"];

    const registro = await db.query(query, values);
    console.log("Registro: ", registro.rows);

    return registro.rows;
  } catch (error: any) {
    console.error("Error: ", error);
    throw Error;
  }
};

module.exports = {
  resetPassword,
};
