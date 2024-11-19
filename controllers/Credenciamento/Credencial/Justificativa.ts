const JustificativaCredServices = require("../../../services/Credenciamento/Credencial/Justificativa");

const insertCredJustificativa = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await JustificativaCredServices.insertCredJustificativa([
      req.body,
      req.profileId,
    ]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getCredJustificativas = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const justificativas = await JustificativaCredServices.getCredJustificativas();
    res.status(200).json(justificativas);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredJustificativa = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const justificativa = await JustificativaCredServices.selectCredJustificativa(cnpj);
    if (!justificativa) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(justificativa);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const deleteCredJustificativa = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await JustificativaCredServices.deleteCredJustificativa(
      cnpj,
      req.profileId
    );
    if (deleted === false) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(deleted);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertCredJustificativa,
  getCredJustificativas,
  selectCredJustificativa,
  deleteCredJustificativa,
};

