import db from "../../database";

const isUniquePerfilAcesso = async (perfilAcesso: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.perfis_acesso WHERE perfil_acesso = $1;";
  const values = [perfilAcesso];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniquePerfilAcesso;
