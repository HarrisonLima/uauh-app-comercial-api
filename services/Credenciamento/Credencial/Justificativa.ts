import JustificativaModel from "../../../models/Credenciamento/Credencial/Justificativa";

const JustificativaCredRepository = require("../../../repositories/Credenciamento/Credencial/Justificativa");

const insertCredJustificativa = async (req: any): Promise<any> => {
  const justificativa = new JustificativaModel(
    req[0].credencial,
    req[0].status,
    req[0].justificativa
  );
  const userId = req[1];
  return await JustificativaCredRepository.insertJustificativa([
    justificativa,
    userId,
  ]);
};

const getCredJustificativas = async (): Promise<any | undefined> => {
  const justificativas = await JustificativaCredRepository.getJustificativas();
  return justificativas;
};

const selectCredJustificativa = async (cnpj: string): Promise<any> => {
  const justificativa = await JustificativaCredRepository.selectJustificativa(cnpj);
  return justificativa;
};

const deleteCredJustificativa = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const justificativa = await JustificativaCredRepository.deleteJustificativa(
    cnpj,
    userId
  );
  return justificativa;
};

module.exports = {
  insertCredJustificativa,
  getCredJustificativas,
  selectCredJustificativa,
  deleteCredJustificativa,
};
