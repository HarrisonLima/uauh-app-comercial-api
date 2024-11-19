import db from "../../database";

const isUniqueCredencialFilial = async (matriz: string, filial: string): Promise<boolean> => {
  const query = "SELECT * FROM credenciais.credencial_filiais WHERE matriz_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $1) AND filial_id = (SELECT id FROM credenciais.credenciais WHERE cnpj = $2);";
  const values = [matriz, filial];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueCredencialFilial;
