const JustificativaServices = require("../../../services/Credenciamento/Credencial/Justificativa");

const insertJustificativa = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await JustificativaServices.insertJustificativa([
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

const getJustificativas = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const justificativas = await JustificativaServices.getJustificativas();
    res.status(200).json(justificativas);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectJustificativa = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const justificativa = await JustificativaServices.selectJustificativa(cnpj);
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

const deleteJustificativa = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await JustificativaServices.deleteJustificativa(
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
  insertJustificativa,
  getJustificativas,
  selectJustificativa,
  deleteJustificativa,
};

