const CondicaoComercialCredServices = require("../../../services/Credenciamento/Credencial/CondicaoComercial");

const insertCredCondicaoComercial = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await CondicaoComercialCredServices.insertCredCondicaoComercial([
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

const getCredCondicoesComerciais = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const condicoesComerciais =
      await CondicaoComercialCredServices.getCredCondicoesComerciais();
    res.status(200).json(condicoesComerciais);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const condicaoComercial =
      await CondicaoComercialCredServices.selectCredCondicaoComercial(cnpj);
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

const updateCredCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await CondicaoComercialCredServices.updateCredCondicaoComercial(
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

const deleteCredCondicaoComercial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  const produto = req.query.produto;
  try {
    const deleted = await CondicaoComercialCredServices.deleteCredCondicaoComercial(cnpj, [produto, req.profileId]);
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
  insertCredCondicaoComercial,
  getCredCondicoesComerciais,
  selectCredCondicaoComercial,
  updateCredCondicaoComercial,
  deleteCredCondicaoComercial,
};
