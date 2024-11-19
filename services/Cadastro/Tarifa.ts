import TarifaModel from "../../models/Cadastro/Tarifa";

const TarifaRepository = require("../../repositories/Cadastro/Tarifa");

const insertTarifa = async (req: any): Promise<any> => {
  const tarifa = new TarifaModel(req[0].tarifa);
  const userId = req[1];
  return await TarifaRepository.insertTarifa([tarifa, userId]);
};

const getTarifas = async (): Promise<any | undefined> => {
  const tarifas = await TarifaRepository.getTarifas();
  return tarifas;
};

const selectTarifa = async (id: number): Promise<any> => {
  const tarifa = await TarifaRepository.selectTarifa(id);
  return tarifa;
};

const updateTarifa = async (id: number, req: any): Promise<any> => {
  const tarifa = new TarifaModel(req[0].tarifa, req[0].situacao);
  const userId = req[1];
  return await TarifaRepository.updateTarifa(id, [tarifa, userId]);
};

module.exports = {
  insertTarifa,
  getTarifas,
  selectTarifa,
  updateTarifa,
};