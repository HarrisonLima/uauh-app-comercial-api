import RemanejacaoModel from "../../../models/Credenciamento/Credencial/Remanejacao";

const RemanejacaoCredRepository = require("../../../repositories/Credenciamento/Credencial/Remanejacao");

const getCredRemanejacoes = async (): Promise<any | undefined> => {
  const remanejacoes = await RemanejacaoCredRepository.getRemanejacoes();
  return remanejacoes;
};

const selectCredRemanejacao = async (cnpj: string): Promise<any> => {
  const remanejacao = await RemanejacaoCredRepository.selectRemanejacao(cnpj);
  return remanejacao;
};

const updateCredRemanejacao = async (cnpj: string, req: any): Promise<any> => {
  const remanejacao = new RemanejacaoModel(req[0].remanejado);
  const userId = req[1];
  return await RemanejacaoCredRepository.updateRemanejacao(cnpj, [
    remanejacao,
    userId,
  ]);
};

module.exports = {
  getCredRemanejacoes,
  selectCredRemanejacao,
  updateCredRemanejacao,
};
