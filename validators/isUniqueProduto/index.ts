import db from "../../database";

const isUniqueProduto = async (produto: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.produtos WHERE produto = $1;";
  const values = [produto];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueProduto;
