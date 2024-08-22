import JustificativaModel from "../../../models/Credenciamento/Cliente/Justificativa";

const JustificativaRepository = require("../../../repositories/Credenciamento/Cliente/Justificativa");

const insertJustificativa = async (req: any): Promise<any> => {
  const justificativa = new JustificativaModel(
    req[0].cliente,
    req[0].status,
    req[0].justificativa
  );
  const userId = req[1];
  return await JustificativaRepository.insertJustificativa([
    justificativa,
    userId,
  ]);
};

const getJustificativas = async (): Promise<any | undefined> => {
  const justificativas = await JustificativaRepository.getJustificativas();
  return justificativas;
};

const selectJustificativa = async (cnpj: string): Promise<any> => {
  const justificativa = await JustificativaRepository.selectJustificativa(cnpj);
  return justificativa;
};

const deleteJustificativa = async (cnpj: string, req: any): Promise<any> => {
  const userId = req;
  const justificativa = await JustificativaRepository.deleteJustificativa(
    cnpj,
    userId
  );
  return justificativa;
};

module.exports = {
  insertJustificativa,
  getJustificativas,
  selectJustificativa,
  deleteJustificativa,
};
