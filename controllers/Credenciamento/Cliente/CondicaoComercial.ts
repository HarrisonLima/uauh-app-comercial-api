const CondicaoComercialServices = require("../../../services/Credenciamento/Cliente/CondicaoComercial");

const insertCondicaoComercial = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await CondicaoComercialServices.insertCondicaoComercial([
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

const getCondicoesComerciais = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const condicoesComerciais =
      await CondicaoComercialServices.getCondicoesComerciais();
    res.status(200).json(condicoesComerciais);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const condicaoComercial =
      await CondicaoComercialServices.selectCondicaoComercial(cnpj);
    if (!condicaoComercial) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(condicaoComercial);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await CondicaoComercialServices.updateCondicaoComercial(
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

const deleteCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  const produto = req.query.produto;
  try {
    const deleted = await CondicaoComercialServices.deleteCondicaoComercial(cnpj, [produto, req.profileId]);
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
  insertCondicaoComercial,
  getCondicoesComerciais,
  selectCondicaoComercial,
  updateCondicaoComercial,
  deleteCondicaoComercial,
};
