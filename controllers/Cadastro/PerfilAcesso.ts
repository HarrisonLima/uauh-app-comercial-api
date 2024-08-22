const PerfilAcessoServices = require("../../services/Cadastro/PerfilAcesso");

const insertPerfilAcesso = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await PerfilAcessoServices.insertPerfilAcesso([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getPerfisAcesso = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const perfisAcesso = await PerfilAcessoServices.getPerfisAcesso();
    res.status(200).json(perfisAcesso);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectPerfilAcesso = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const perfilAcesso = await PerfilAcessoServices.selectPerfilAcesso(id);
    if (!perfilAcesso) {
      return res
        .status(404)
        .json({ message: "Registro não encontrado" });
    }
    res.status(200).json(perfilAcesso);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updatePerfilAcesso = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await PerfilAcessoServices.updatePerfilAcesso(id, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertPerfilAcesso,
  getPerfisAcesso,
  selectPerfilAcesso,
  updatePerfilAcesso,
};
