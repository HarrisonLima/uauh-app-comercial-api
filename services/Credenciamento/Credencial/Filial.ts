import FilialModel from "../../../models/Credenciamento/Credencial/Filial";

const FilialCredRepository = require("../../../repositories/Credenciamento/Credencial/Filial");

const insertCredFilial = async (req: any): Promise<any> => {
  const filial = new FilialModel(req[0].matriz, req[0].filial);
  const userId = req[1];
  return await FilialCredRepository.insertFilial([filial, userId]);
};

const getCredFiliais = async (): Promise<any | undefined> => {
  const filiais = await FilialCredRepository.getFiliais();
  return filiais;
};

const selectCredFilial = async (cnpj: string): Promise<any> => {
  const filial = await FilialCredRepository.selectFilial(cnpj);
  return filial;
};

const updateCredFilial = async (cnpj: string, req: any): Promise<any> => {
  const filial = new FilialModel(req[0].matriz, req[0].filial);
  const userId = req[1];
  return await FilialCredRepository.updateFilial(cnpj, [filial, userId]);
};

const deleteCredFilial = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const filial = await FilialCredRepository.deleteFilial(cnpj, userId);
  return filial;
};

module.exports = {
  insertCredFilial,
  getCredFiliais,
  selectCredFilial,
  updateCredFilial,
  deleteCredFilial,
};
