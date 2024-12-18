import db from "../../database";

const isUniqueCredencial = async (cnpj: string): Promise<boolean> => {
  const query = "SELECT * FROM credenciais.credenciais WHERE cnpj = $1;";
  const values = [cnpj];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueCredencial;
