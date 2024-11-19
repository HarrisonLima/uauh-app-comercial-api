const StatusCredService = require("../../../services/Credenciamento/Credencial/Status");

const getCredStatus = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const status = await StatusCredService.getCredStatus();
    res.status(200).json(status);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredStatus = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const status = await StatusCredService.selectCredStatus(cnpj);
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

const updateCredStatus = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await StatusCredService.updateCredStatus(cnpj, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  getCredStatus,
  selectCredStatus,
  updateCredStatus,
};
