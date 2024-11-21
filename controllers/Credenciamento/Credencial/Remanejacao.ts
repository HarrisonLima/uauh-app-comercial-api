const RemanejacaoCredServices = require("../../../services/Credenciamento/Credencial/Remanejacao");

const getCredRemanejacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const remanejacoes = await RemanejacaoCredServices.getCredRemanejacoes();
    res.status(200).json(remanejacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredRemanejacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const remanejacao = await RemanejacaoCredServices.selectCredRemanejacao(cnpj);
    if (!remanejacao) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(remanejacao);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateCredRemanejacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;

  try {
    const resultado = await RemanejacaoCredServices.updateCredRemanejacao(cnpj, [
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

module.exports = {
  getCredRemanejacoes,
  selectCredRemanejacao,
  updateCredRemanejacao,
};
