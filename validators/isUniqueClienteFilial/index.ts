import db from "../../database";

const isUniqueClienteFilial = async (matriz: string, filial: string): Promise<boolean> => {
  const query = "SELECT * FROM clientes.cliente_filiais WHERE matriz_id = (SELECT id FROM clientes.clientes WHERE cnpj = $1) AND filial_id = (SELECT id FROM clientes.clientes WHERE cnpj = $2);";
  const values = [matriz, filial];
  const { rows } = await db.query(query, values);
  
  return !(rows.length > 0);
};

export default isUniqueClienteFilial;
