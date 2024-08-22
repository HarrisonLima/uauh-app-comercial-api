import db from "../../database";

const isUniqueUsuario = async (usuario: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.usuarios WHERE usuario = $1;";
  const values = [usuario];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueUsuario;
