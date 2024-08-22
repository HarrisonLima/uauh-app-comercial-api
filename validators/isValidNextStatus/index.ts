import db from "../../database";

const isValidNextStatusCliente = async (
  cnpj: string,
  status: string
): Promise<boolean> => {
  const query = `SELECT status.status FROM clientes.cliente_status 
  JOIN 
    cadastros.status ON cliente_status.status_id = status.id WHERE cliente_id = (SELECT id FROM clientes.clientes WHERE clientes.cnpj = $1);`;
  const values = [cnpj];
  const { rows } = await db.query(query, values);

  const statusAtual = rows[0].status;

  switch (statusAtual) {
    case "Aguardando aprovação":
      return ["Aprovado", "Reprovado", "Desenvolvimento"].includes(status);
    case "Aprovado":
    case "Excluído":
      return ["Retornado"].includes(status);
    case "Desenvolvimento":
      return ["Aguardando aprovação", "Em exclusão"].includes(status);
    case "Em exclusão":
      return ["Desenvolvimento", "Excluído", "Exclusão reprovada"].includes(
        status
      );
    case "Exclusão reprovada":
      return ["Aguardando aprovação", "Em exclusão"].includes(status);
    case "Reprovado":
      return ["Aguardando aprovação", "Em exclusão"].includes(status);
    case "Retornado":
      return ["Aguardando aprovação", "Em exclusão"].includes(status);
    default:
      return false;
  }
};

module.exports = {
  isValidNextStatusCliente,
};
