const DadosBancariosServices = require("../../../services/Credenciamento/Credencial/CondicaoComercial");

const insertDadosBancarios = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await DadosBancariosServices.insertDadosBancarios([
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

const getDadosBancarios = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const dadosBancarios =
      await DadosBancariosServices.getDadosBancarios();
    res.status(200).json(dadosBancarios);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectDadosBancarios = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const dadosBancarios =
      await DadosBancariosServices.selectDadosBancarios(cnpj);
    if (!dadosBancarios) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(dadosBancarios);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateDadosBancarios = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await DadosBancariosServices.updateDadosBancarios(
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

const deleteDadosBancarios = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  const produto = req.query.produto;
  try {
    const deleted = await DadosBancariosServices.deleteDadosBancarios(cnpj, [produto, req.profileId]);
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
  insertDadosBancarios,
  getDadosBancarios,
  selectDadosBancarios,
  updateDadosBancarios,
  deleteDadosBancarios,
};
