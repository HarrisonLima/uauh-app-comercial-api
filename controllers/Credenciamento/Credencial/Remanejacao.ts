const RemanejacaoServices = require("../../../services/Credenciamento/Credencial/Remanejacao");

const getRemanejacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const remanejacoes = await RemanejacaoServices.getRemanejacoes();
    res.status(200).json(remanejacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectRemanejacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const remanejacao = await RemanejacaoServices.selectRemanejacao(cnpj);
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

const updateRemanejacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;

  console.log(cnpj, req.body);
  try {
    const resultado = await RemanejacaoServices.updateRemanejacao(cnpj, [
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
  getRemanejacoes,
  selectRemanejacao,
  updateRemanejacao,
};
