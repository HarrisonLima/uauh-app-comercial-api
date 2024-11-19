import ObservacaoModel from "../../../models/Credenciamento/Credencial/Observacao";

const ObservacaoCredRepository = require("../../../repositories/Credenciamento/Credencial/Observacao");

const insertCredObservacao = async (req: any): Promise<any> => {
  const observacao = new ObservacaoModel(req[0].credencial, req[0].observacao);
  const userId = req[1];
  return await ObservacaoCredRepository.insertObservacao([observacao, userId]);
};

const getCredObservacoes = async (): Promise<any | undefined> => {
  const observacoes = await ObservacaoCredRepository.getObservacoes();
  return observacoes;
};

const selectCredObservacao = async (cnpj: string): Promise<any> => {
  const observacao = await ObservacaoCredRepository.selectObservacao(cnpj);
  return observacao;
};

const updateCredObservacao = async (cnpj: string, req: any): Promise<any> => {
  const observacao = new ObservacaoModel(req[0].credencial, req[0].observacao);
  const userId = req[1];
  return await ObservacaoCredRepository.updateObservacao(cnpj, [observacao, userId]);
};

const deleteCredObservacao = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const observacao = await ObservacaoCredRepository.deleteObservacao(cnpj, userId);
  return observacao;
};

module.exports = {
  insertCredObservacao,
  getCredObservacoes,
  selectCredObservacao,
  updateCredObservacao,
  deleteCredObservacao,
};
