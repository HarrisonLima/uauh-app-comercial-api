import IdentificacaoModel from "../../../models/Credenciamento/Credencial/Identificacao";

const IdentificacaoCredRepository = require("../../../repositories/Credenciamento/Credencial/Identificacao");

const insertCredIdentificacao = async (req: any): Promise<any> => {
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
  return await IdentificacaoCredRepository.insertIdentificacao([
    identificacao,
    userId,
  ]);
};

const getCredIdentificacoes = async (): Promise<any | undefined> => {
  const identificacoes = await IdentificacaoCredRepository.getIdentificacoes();
  return identificacoes;
};

const selectCredIdentificacao = async (cnpj: string): Promise<any> => {
  const identificacao = await IdentificacaoCredRepository.selectIdentificacao(cnpj);
  return identificacao;
};

const updateCredIdentificacao = async (cnpj: string, req: any): Promise<any> => {
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
  return await IdentificacaoCredRepository.updateIdentificacao(cnpj, [
    identificacao,
    userId,
  ]);
};

const deleteCredIdentificacao = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const identificacao = await IdentificacaoCredRepository.deleteIdentificacao(
    cnpj,
    userId
  );
  return identificacao;
};

module.exports = {
  insertCredIdentificacao,
  getCredIdentificacoes,
  selectCredIdentificacao,
  updateCredIdentificacao,
  deleteCredIdentificacao,
};
