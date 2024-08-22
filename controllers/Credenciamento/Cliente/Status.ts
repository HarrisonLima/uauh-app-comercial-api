const StatusService = require("../../../services/Credenciamento/Cliente/Status");

const getClientesStatus = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const status = await StatusService.getStatus();
    res.status(200).json(status);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectClientesStatus = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const status = await StatusService.selectStatus(cnpj);
    if (!status) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(status);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateClientesStatus = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await StatusService.updateStatus(cnpj, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  getClientesStatus,
  selectClientesStatus,
  updateClientesStatus,
};
