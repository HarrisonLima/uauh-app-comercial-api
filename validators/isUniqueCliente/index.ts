import db from "../../database";

const isUniqueCliente = async (cnpj: string): Promise<boolean> => {
  const query = "SELECT * FROM clientes.clientes WHERE cnpj = $1;";
  const values = [cnpj];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueCliente;
