import CondicaoComercialModel from "../../../models/Credenciamento/Cliente/CondicaoComercial";

const CondicacaoComercialRepository = require("../../../repositories/Credenciamento/Cliente/CondicaoComercial");

const insertCondicaoComercial = async (req: any): Promise<any> => {
  const condicaoComercial = new CondicaoComercialModel(
    req[0].cliente,
    req[0].produto,
    req[0].tipoPagamento,
    req[0].faturamento,
    req[0].rede,
    req[0].saqueIncluso,
    req[0].apuracao,
    req[0].pagamento,
    req[0].taxa,
    req[0].limite,
    req[0].adesao,
    req[0].emissao,
    req[0].segundaVia
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

const updateCondicaoComercial = async (cnpj: string, req: any): Promise<any> => {
  const condicaoComercial = new CondicaoComercialModel(
    req[0].cliente,
    req[0].produto,
    req[0].tipoPagamento,
    req[0].faturamento,
    req[0].rede,
    req[0].saqueIncluso,
    req[0].apuracao,
    req[0].pagamento,
    req[0].taxa,
    req[0].limite,
    req[0].adesao,
    req[0].emissao,
    req[0].segundaVia
  );
  const userId = req[1];
  return await CondicacaoComercialRepository.updateCondicaoComercial(cnpj, [
    condicaoComercial,
    userId,
  ]);
};

const deleteCondicaoComercial = async (cnpj: string, req: any): Promise<any> => {
  const produto = req[0];
  const userId = req[1];
  const condicaoComercial =
    await CondicacaoComercialRepository.deleteCondicaoComercial(cnpj, [produto, userId]);
  return condicaoComercial;
};

module.exports = {
  insertCondicaoComercial,
  getCondicoesComerciais,
  selectCondicaoComercial,
  updateCondicaoComercial,
  deleteCondicaoComercial,
};
