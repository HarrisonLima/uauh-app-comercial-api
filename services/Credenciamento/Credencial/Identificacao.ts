import IdentificacaoModel from "../../../models/Credenciamento/Credencial/Identificacao";

const IdentificacaoRepository = require("../../../repositories/Credenciamento/Credencial/Identificacao");

const insertIdentificacao = async (req: any): Promise<any> => {
  const identificacao = new IdentificacaoModel(
    req[0].simplesNacional,
    req[0].cnpj,
    req[0].razaoSocial,
    req[0].inscricaoEstadual,
    req[0].ramoAtividade,
    req[0].nomeFantasia,
    req[0].telefone,
    req[0].email,
    req[0].emailFinanceiro,
    req[0].matriz
  );
  const userId = req[1];
  return await IdentificacaoRepository.insertIdentificacao([
    identificacao,
    userId,
  ]);
};

const getIdentificacoes = async (): Promise<any | undefined> => {
  const identificacoes = await IdentificacaoRepository.getIdentificacoes();
  return identificacoes;
};

const selectIdentificacao = async (cnpj: string): Promise<any> => {
  const identificacao = await IdentificacaoRepository.selectIdentificacao(cnpj);
  return identificacao;
};

const updateIdentificacao = async (cnpj: string, req: any): Promise<any> => {
  const identificacao = new IdentificacaoModel(
    req[0].simplesNacional,
    req[0].cnpj,
    req[0].razaoSocial,
    req[0].inscricaoEstadual,
    req[0].ramoAtividade,
    req[0].nomeFantasia,
    req[0].telefone,
    req[0].email,
    req[0].emailFinanceiro
  );
  const userId = req[1];
  return await IdentificacaoRepository.updateIdentificacao(cnpj, [
    identificacao,
    userId,
  ]);
};

const deleteIdentificacao = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const identificacao = await IdentificacaoRepository.deleteIdentificacao(
    cnpj,
    userId
  );
  return identificacao;
};

module.exports = {
  insertIdentificacao,
  getIdentificacoes,
  selectIdentificacao,
  updateIdentificacao,
  deleteIdentificacao,
};
