import DadosBancariosModel from "../../../models/Credenciamento/Credencial/DadosBancarios";

const DadosBancariosRepository = require("../../../repositories/Credenciamento/Credencial/DadosBancarios");

const insertDadosBancarios = async (req: any): Promise<any> => {
  const dadosBancarios = new DadosBancariosModel(
    req[0].credencial,
    req[0].titular_proprio,
    req[0].nome_titular,
    req[0].documento_titular,
    req[0].tipo_conta,
    req[0].banco,
    req[0].agencia,
    req[0].conta,
    req[0].chave_pix
  );
  const userId = req[1];
  return await DadosBancariosRepository.insertDadosBancarios([
    dadosBancarios,
    userId,
  ]);
};

const getDadosBancarios = async (): Promise<any | undefined> => {
  const dadosBancarios = await DadosBancariosRepository.getDadosBancarios();
  return dadosBancarios;
};

const selectDadosBancarios = async (cnpj: string): Promise<any> => {
  const dadosBancarios = await DadosBancariosRepository.selectDadosBancarios(
    cnpj
  );
  return dadosBancarios;
};

const updateDadosBancarios = async (cnpj: string, req: any): Promise<any> => {
  const dadosBancarios = new DadosBancariosModel(
    req[0].credencial,
    req[0].titular_proprio,
    req[0].nome_titular,
    req[0].documento_titular,
    req[0].tipo_conta,
    req[0].banco,
    req[0].agencia,
    req[0].conta,
    req[0].chave_pix
  );
  const userId = req[1];
  return await DadosBancariosRepository.updateDadosBancarios(cnpj, [
    dadosBancarios,
    userId,
  ]);
};

module.exports = {
  insertDadosBancarios,
  getDadosBancarios,
  selectDadosBancarios,
  updateDadosBancarios,
};
