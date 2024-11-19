const LocalizacaoCredServices = require("../../../services/Credenciamento/Credencial/Localizacao");

const getCredLocalizacoes = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const localizacoes = await LocalizacaoCredServices.getCredLocalizacoes();
    res.status(200).json(localizacoes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredLocalizacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const localizacao = await LocalizacaoCredServices.selectCredLocalizacao(cnpj);
    if (!localizacao) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(localizacao);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateCredLocalizacao = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await LocalizacaoCredServices.updateCredLocalizacao(cnpj, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  getCredLocalizacoes,
  selectCredLocalizacao,
  updateCredLocalizacao,
};
