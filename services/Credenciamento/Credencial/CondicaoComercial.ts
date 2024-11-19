import CondicaoComercialModel from "../../../models/Credenciamento/Credencial/CondicaoComercial";

const CondicacaoComercialRepository = require("../../../repositories/Credenciamento/Credencial/CondicaoComercial");

const insertCondicaoComercial = async (req: any): Promise<any> => {
  const condicaoComercial = new CondicaoComercialModel(
    req[0].credencial,
    req[0].apuracao,
    req[0].fechamento,
    req[0].produto,
    req[0].tarifa
  );
  const userId = req[1];
  return await CondicacaoComercialRepository.insertCondicaoComercial([
    condicaoComercial,
    userId,
  ]);
};

const getCondicoesComerciais = async (): Promise<any | undefined> => {
  const condicoesComerciais =
    await CondicacaoComercialRepository.getCondicoesComerciais();
  return condicoesComerciais;
};

const selectCondicaoComercial = async (cnpj: string): Promise<any> => {
  const condicaoComercial =
    await CondicacaoComercialRepository.selectCondicaoComercial(cnpj);
  return condicaoComercial;
};

const updateCondicaoComercial = async (
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
  return await CondicacaoComercialRepository.updateCondicaoComercial(cnpj, [
    condicaoComercial,
    userId,
  ]);
};

const deleteCondicaoComercial = async (
  cnpj: string,
  req: any
): Promise<any> => {
  const item_id = req[0];
  const tipo_item = req[1];
  const userId = req[2];
  const condicaoComercial =
    await CondicacaoComercialRepository.deleteCondicaoComercial(cnpj, [
      item_id,
      tipo_item,
      userId,
    ]);
  return condicaoComercial;
};

module.exports = {
  insertCondicaoComercial,
  getCondicoesComerciais,
  selectCondicaoComercial,
  updateCondicaoComercial,
  deleteCondicaoComercial,
};
