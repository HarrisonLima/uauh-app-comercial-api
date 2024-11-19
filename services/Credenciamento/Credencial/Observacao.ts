import ObservacaoModel from "../../../models/Credenciamento/Credencial/Observacao";

const ObservacaoRepository = require("../../../repositories/Credenciamento/Credencial/Observacao");

const insertObservacao = async (req: any): Promise<any> => {
  const observacao = new ObservacaoModel(req[0].credencial, req[0].observacao);
  const userId = req[1];
  return await ObservacaoRepository.insertObservacao([observacao, userId]);
};

const getObservacoes = async (): Promise<any | undefined> => {
  const observacoes = await ObservacaoRepository.getObservacoes();
  return observacoes;
};

const selectObservacao = async (cnpj: string): Promise<any> => {
  const observacao = await ObservacaoRepository.selectObservacao(cnpj);
  return observacao;
};

const updateObservacao = async (cnpj: string, req: any): Promise<any> => {
  const observacao = new ObservacaoModel(req[0].credencial, req[0].observacao);
  const userId = req[1];
  return await ObservacaoRepository.updateObservacao(cnpj, [observacao, userId]);
};

const deleteObservacao = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const observacao = await ObservacaoRepository.deleteObservacao(cnpj, userId);
  return observacao;
};

module.exports = {
  insertObservacao,
  getObservacoes,
  selectObservacao,
  updateObservacao,
  deleteObservacao,
};
