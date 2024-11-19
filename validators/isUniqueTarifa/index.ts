import db from "../../database";

const isUniqueTarifa = async (tarifa: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.tarifas WHERE tarifa = $1;";
  const values = [tarifa];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueTarifa;
