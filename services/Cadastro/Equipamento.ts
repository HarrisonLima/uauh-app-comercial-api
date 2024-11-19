import EquipamentoModel from "../../models/Cadastro/Equipamento";

const EquipamentoRepository = require("../../repositories/Cadastro/Equipamento");

const insertEquipamento = async (req: any): Promise<any> => {
  const equipamento = new EquipamentoModel(req[0].equipamento);
  const userId = req[1];
  return await EquipamentoRepository.insertEquipamento([equipamento, userId]);
};

const getEquipamentos = async (): Promise<any | undefined> => {
  const equipamentos = await EquipamentoRepository.getEquipamentos();
  return equipamentos;
};

const selectEquipamento = async (id: number): Promise<any> => {
  const equipamento = await EquipamentoRepository.selectEquipamento(id);
  return equipamento;
};

const updateEquipamento = async (id: number, req: any): Promise<any> => {
  const equipamento = new EquipamentoModel(req[0].equipamento, req[0].situacao);
  const userId = req[1];
  return await EquipamentoRepository.updateEquipamento(id, [equipamento, userId]);
};

module.exports = {
  insertEquipamento,
  getEquipamentos,
  selectEquipamento,
  updateEquipamento,
};