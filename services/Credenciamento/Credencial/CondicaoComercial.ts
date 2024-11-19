import CondicaoComercialModel from "../../../models/Credenciamento/Credencial/CondicaoComercial";

const CondicacaoComercialCredRepository = require("../../../repositories/Credenciamento/Credencial/CondicaoComercial");

const insertCredCondicaoComercial = async (req: any): Promise<any> => {
  const condicaoComercial = new CondicaoComercialModel(
    req[0].credencial,
    req[0].apuracao,
    req[0].fechamento,
    req[0].produto,
    req[0].tarifa
  );
  const userId = req[1];
  return await CondicacaoComercialCredRepository.insertCondicaoComercial([
    condicaoComercial,
    userId,
  ]);
};

const getCredCondicoesComerciais = async (): Promise<any | undefined> => {
  const condicoesComerciais =
    await CondicacaoComercialCredRepository.getCondicoesComerciais();
  return condicoesComerciais;
};

const selectCredCondicaoComercial = async (cnpj: string): Promise<any> => {
  const condicaoComercial =
    await CondicacaoComercialCredRepository.selectCondicaoComercial(cnpj);
  return condicaoComercial;
};

const updateCredCondicaoComercial = async (
  cnpj: string,
  req: any
): Promise<any> => {
  const condicaoComercial = new CondicaoComercialModel(
    req[0].credencial,
    req[0].apuracao,
    req[0].fechamento,
    req[0].produto,
    req[0].tarifa
  );
  const userId = req[1];
  return await CondicacaoComercialCredRepository.updateCondicaoComercial(cnpj, [
    condicaoComercial,
    userId,
  ]);
};

const deleteCredCondicaoComercial = async (
  cnpj: string,
  req: any
): Promise<any> => {
  const item_id = req[0];
  const tipo_item = req[1];
  const userId = req[2];
  const condicaoComercial =
    await CondicacaoComercialCredRepository.deleteCondicaoComercial(cnpj, [
      item_id,
      tipo_item,
      userId,
    ]);
  return condicaoComercial;
};

module.exports = {
  insertCredCondicaoComercial,
  getCredCondicoesComerciais,
  selectCredCondicaoComercial,
  updateCredCondicaoComercial,
  deleteCredCondicaoComercial,
};
