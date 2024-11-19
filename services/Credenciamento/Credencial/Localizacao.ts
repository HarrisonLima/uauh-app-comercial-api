import LocalizacaoModel from "../../../models/Credenciamento/Credencial/Localizacao";

const LocalizacaoRepository = require("../../../repositories/Credenciamento/Credencial/Localizacao");

const getLocalizacoes = async (): Promise<any | undefined> => {
  const localizacoes = await LocalizacaoRepository.getLocalizacoes();
  return localizacoes;
};

const selectLocalizacao = async (cnpj: string): Promise<any> => {
  const localizacao = await LocalizacaoRepository.selectLocalizacao(cnpj);
  return localizacao;
};

const updateLocalizacao = async (cnpj: string, req: any): Promise<any> => {
  const localizacao = new LocalizacaoModel(
    req[0].cliente,
    req[0].cep,
    req[0].cidade,
    req[0].uf,
    req[0].bairro,
    req[0].numero,
    req[0].endereco,
    req[0].complemento,
    req[0].coordenadas,
  );
  const userId = req[1];
  return await LocalizacaoRepository.updateLocalizacao(cnpj, [
    localizacao,
    userId,
  ]);
};

module.exports = {
  getLocalizacoes,
  selectLocalizacao,
  updateLocalizacao,
};
