const RegistrosCredRepository = require("../../../repositories/Credenciamento/Credencial/Registros");

const getCredRegistrosServices = async (): Promise<any | undefined> => {
  const registros = await RegistrosCredRepository.getRegistros();
  return registros;
};

const selectCredRegistrosServices = async (cnpj: string): Promise<any> => {
  const registro = await RegistrosCredRepository.selectRegistros(cnpj);
  return registro;
};

module.exports = {
  getCredRegistrosServices,
  selectCredRegistrosServices,
};
