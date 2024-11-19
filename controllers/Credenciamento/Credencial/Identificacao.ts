const IdentificacaoCredServices = require("../../../services/Credenciamento/Credencial/Identificacao");

const insertCredIdentificacao = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await IdentificacaoCredServices.insertCredIdentificacao([
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

const getCredIdentificacoes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const identificacoes = await IdentificacaoCredServices.getCredIdentificacoes();
    res.status(200).json(identificacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const identificacao = await IdentificacaoCredServices.selectCredIdentificacao(cnpj);
    if (!identificacao) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(identificacao);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateCredIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await IdentificacaoCredServices.updateCredIdentificacao(
      cnpj,
      [req.body, req.profileId]
    );
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const deleteCredIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await IdentificacaoCredServices.deleteCredIdentificacao(cnpj, req.profileId);
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
  insertCredIdentificacao,
  getCredIdentificacoes,
  selectCredIdentificacao,
  updateCredIdentificacao,
  deleteCredIdentificacao,
};
