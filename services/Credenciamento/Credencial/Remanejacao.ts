import RemanejacaoModel from "../../../models/Credenciamento/Credencial/Remanejacao";

const RemanejacaoRepository = require("../../../repositories/Credenciamento/Credencial/Remanejacao");

const getRemanejacoes = async (): Promise<any | undefined> => {
  const remanejacoes = await RemanejacaoRepository.getRemanejacoes();
  return remanejacoes;
};

const selectRemanejacao = async (cnpj: string): Promise<any> => {
  const remanejacao = await RemanejacaoRepository.selectRemanejacao(cnpj);
  return remanejacao;
};

const updateRemanejacao = async (cnpj: string, req: any): Promise<any> => {
  const remanejacao = new RemanejacaoModel(req[0].remanejado);
  const userId = req[1];
  return await RemanejacaoRepository.updateRemanejacao(cnpj, [
    remanejacao,
    userId,
  ]);
};

module.exports = {
  getRemanejacoes,
  selectRemanejacao,
  updateRemanejacao,
};
