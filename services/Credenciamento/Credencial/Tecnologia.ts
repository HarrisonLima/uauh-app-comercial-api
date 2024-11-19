import TecnologiaModel from "../../../models/Credenciamento/Credencial/Tecnologia";

const TecnologiaRepository = require("../../../repositories/Credenciamento/Credencial/Tecnologia");

const insertTecnologia = async (req: any): Promise<any> => {
  const tecnologia = new TecnologiaModel(
    req[0].credencial,
    req[0].equipamento_id,
    req[0].cnpj_equipamento,
    req[0].ec_equipamento
  );
  const userId = req[1];
  return await TecnologiaRepository.insertTecnologia([tecnologia, userId]);
};

const getTecnologias = async (): Promise<any | undefined> => {
  const tecnologias =
    await TecnologiaRepository.getTecnologias();
  return tecnologias;
};

const selectTecnologia = async (cnpj: string): Promise<any> => {
  const tecnologia = await TecnologiaRepository.selectTecnologia(cnpj);
  return tecnologia;
};

const updateTecnologia = async (cnpj: string, req: any): Promise<any> => {
  const tecnologia = new TecnologiaModel(
    req[0].credencial,
    req[0].equipamento_id,
    req[0].cnpj_equipamento,
    req[0].ec_equipamento
  );
  const userId = req[1];
  return await TecnologiaRepository.updateTecnologia(cnpj, [
    tecnologia,
    userId,
  ]);
};

const deleteTecnologia = async (cnpj: string, req: any): Promise<any> => {
  const equipamento_id = req[0];
  const userId = req[1];
  const tecnologia = await TecnologiaRepository.deleteTecnologia(cnpj, [
    equipamento_id,
    userId,
  ]);
  return tecnologia;
};

module.exports = {
  insertTecnologia,
  getTecnologias,
  selectTecnologia,
  updateTecnologia,
  deleteTecnologia,
};
