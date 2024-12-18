import TecnologiaModel from "../../../models/Credenciamento/Credencial/Tecnologia";

const TecnologiaCredRepository = require("../../../repositories/Credenciamento/Credencial/Tecnologia");

const insertCredTecnologia = async (req: any): Promise<any> => {
  const tecnologia = new TecnologiaModel(
    req[0].credencial,
    req[0].idEquipamento,
    req[0].cnpjEquipamento,
    req[0].ecEquipamento
  );
  const userId = req[1];
  return await TecnologiaCredRepository.insertTecnologia([tecnologia, userId]);
};

const getCredTecnologias = async (): Promise<any | undefined> => {
  const tecnologias = await TecnologiaCredRepository.getTecnologias();
  return tecnologias;
};

const selectCredTecnologia = async (cnpj: string): Promise<any> => {
  const tecnologia = await TecnologiaCredRepository.selectTecnologia(cnpj);
  return tecnologia;
};

const updateCredTecnologia = async (cnpj: string, req: any): Promise<any> => {
  const tecnologia = new TecnologiaModel(
    req[0].credencial,
    req[0].idEquipamento,
    req[0].cnpjEquipamento,
    req[0].ecEquipamento
  );
  const userId = req[1];
  return await TecnologiaCredRepository.updateTecnologia(cnpj, [
    tecnologia,
    userId,
  ]);
};

const deleteCredTecnologia = async (cnpj: string, req: any): Promise<any> => {
  const equipamento = req[0];
  const userId = req[1];
  const tecnologia = await TecnologiaCredRepository.deleteTecnologia(cnpj, [
    equipamento,
    userId,
  ]);
  return tecnologia;
};

module.exports = {
  insertCredTecnologia,
  getCredTecnologias,
  selectCredTecnologia,
  updateCredTecnologia,
  deleteCredTecnologia,
};
