const RegistrosRepository = require("../../../repositories/Credenciamento/Cliente/Registros");

const getRegistrosServices = async (): Promise<any | undefined> => {
  const registros = await RegistrosRepository.getRegistros();
  return registros;
};

const selectRegistrosServices = async (cnpj: string): Promise<any> => {
  const registro = await RegistrosRepository.selectRegistros(cnpj);
  return registro.rows;
};

module.exports = {
  getRegistrosServices,
  selectRegistrosServices,
};
