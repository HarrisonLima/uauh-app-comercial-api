const ObservacaoCredServices = require("../../../services/Credenciamento/Credencial/Observacao");

const insertCredObservacao = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await ObservacaoCredServices.insertCredObservacao([
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

const getCredObservacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const observacoes = await ObservacaoCredServices.getCredObservacoes();
    res.status(200).json(observacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const observacao = await ObservacaoCredServices.selectCredObservacao(cnpj);
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

const updateCredObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await ObservacaoCredServices.updateCredObservacao(cnpj, [
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

const deleteCredObservacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await ObservacaoCredServices.deleteCredObservacao(
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
  insertCredObservacao,
  getCredObservacoes,
  selectCredObservacao,
  updateCredObservacao,
  deleteCredObservacao,
};
