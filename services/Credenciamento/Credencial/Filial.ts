import FilialModel from "../../../models/Credenciamento/Credencial/Filial";

const FilialRepository = require("../../../repositories/Credenciamento/Credencial/Filial");

const insertFilial = async (req: any): Promise<any> => {
  const filial = new FilialModel(req[0].matriz, req[0].filial);
  const userId = req[1];
  return await FilialRepository.insertFilial([filial, userId]);
};

const getFiliais = async (): Promise<any | undefined> => {
  const filiais = await FilialRepository.getFiliais();
  return filiais;
};

const selectFilial = async (cnpj: string): Promise<any> => {
  const filial = await FilialRepository.selectFilial(cnpj);
  return filial;
};

const updateFilial = async (cnpj: string, req: any): Promise<any> => {
  const filial = new FilialModel(req[0].matriz, req[0].filial);
  const userId = req[1];
  return await FilialRepository.updateFilial(cnpj, [filial, userId]);
};

const deleteFilial = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const filial = await FilialRepository.deleteFilial(cnpj, userId);
  return filial;
};

module.exports = {
  insertFilial,
  getFiliais,
  selectFilial,
  updateFilial,
  deleteFilial,
};
