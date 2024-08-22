import db from "../../database";

const isUniqueCondicaoComercial = async (
  cnpj: string,
  produto: string
): Promise<boolean> => {
  const query =
    "SELECT * FROM clientes.cliente_condicoes_comerciais WHERE cliente_condicoes_comerciais.cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1) AND cliente_condicoes_comerciais.produto_id = $2;";
  const values = [cnpj, produto];
  const { rows } = await db.query(query, values);

  return !(rows.length > 0);
};

export default isUniqueCondicaoComercial;
