import LocalizacaoModel from "../../../models/Credenciamento/Credencial/Localizacao";

const LocalizacaoCredRepository = require("../../../repositories/Credenciamento/Credencial/Localizacao");

const getCredLocalizacoes = async (): Promise<any | undefined> => {
  const localizacoes = await LocalizacaoCredRepository.getLocalizacoes();
  return localizacoes;
};

const selectCredLocalizacao = async (cnpj: string): Promise<any> => {
  const localizacao = await LocalizacaoCredRepository.selectLocalizacao(cnpj);
  return localizacao;
};

const updateCredLocalizacao = async (cnpj: string, req: any): Promise<any> => {
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
  return await LocalizacaoCredRepository.updateLocalizacao(cnpj, [
    localizacao,
    userId,
  ]);
};

module.exports = {
  getCredLocalizacoes,
  selectCredLocalizacao,
  updateCredLocalizacao,
};
