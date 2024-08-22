const IdentificacaoServices = require("../../../services/Credenciamento/Cliente/Identificacao");

const insertIdentificacao = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await IdentificacaoServices.insertIdentificacao([
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

const getIdentificacoes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const identificacoes = await IdentificacaoServices.getIdentificacoes();
    res.status(200).json(identificacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const identificacao = await IdentificacaoServices.selectIdentificacao(cnpj);
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

const updateIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await IdentificacaoServices.updateIdentificacao(
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

const deleteIdentificacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await IdentificacaoServices.deleteIdentificacao(cnpj, req.profileId);
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
  insertIdentificacao,
  getIdentificacoes,
  selectIdentificacao,
  updateIdentificacao,
  deleteIdentificacao,
};
