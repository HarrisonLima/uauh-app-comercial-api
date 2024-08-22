const ObservacaoServices = require("../../../services/Credenciamento/Cliente/Observacao");

const insertObservacao = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await ObservacaoServices.insertObservacao([
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

const getObservacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const observacoes = await ObservacaoServices.getObservacoes();
    res.status(200).json(observacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const observacao = await ObservacaoServices.selectObservacao(cnpj);
    if (!observacao) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(observacao);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await ObservacaoServices.updateObservacao(cnpj, [
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

const deleteObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await ObservacaoServices.deleteObservacao(
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
  insertObservacao,
  getObservacoes,
  selectObservacao,
  updateObservacao,
  deleteObservacao,
};
