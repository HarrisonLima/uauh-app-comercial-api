const EquipamentoServices = require("../../services/Cadastro/Equipamento");

const insertEquipamento = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await EquipamentoServices.insertEquipamento([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getEquipamentos = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const equipamentos = await EquipamentoServices.getEquipamentos();
    res.status(200).json(equipamentos);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectEquipamento = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const equipamentos = await EquipamentoServices.selectEquipamento(id);
    if (!equipamentos) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(equipamentos);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateEquipamento = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await EquipamentoServices.updateEquipamento(id, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertEquipamento,
  getEquipamentos,
  selectEquipamento,
  updateEquipamento,
};
