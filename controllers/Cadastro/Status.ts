const StatusServices = require("../../services/Cadastro/Status");

const insertStatus = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await StatusServices.insertStatus([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getStatus = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const status = await StatusServices.getStatus();
    res.status(200).json(status);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectStatus = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const status = await StatusServices.selectStatus(id);
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

const updateStatus = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await StatusServices.updateStatus(id, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertStatus,
  getStatus,
  selectStatus,
  updateStatus,
};
