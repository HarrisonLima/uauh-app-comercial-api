import db from "../../database";

const isUniqueEquipamento = async (equipamento: string): Promise<boolean> => {
  const query = "SELECT * FROM cadastros.equipamentos WHERE equipamento = $1;";
  const values = [equipamento];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueEquipamento;
