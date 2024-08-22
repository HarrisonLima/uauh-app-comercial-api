import db from "../../database";

const isUniqueStatus = async (status: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.status WHERE status = $1;";
  const values = [status];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueStatus;
