const FilialServices = require("../../../services/Credenciamento/Cliente/Filial");

const insertFilial = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await FilialServices.insertFilial([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getFiliais = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const filiais = await FilialServices.getFiliais();
    res.status(200).json(filiais);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectFilial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const filial = await FilialServices.selectFilial(cnpj);
    if (!filial) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(filial);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const deleteFilial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;

  try {
    const deleted = await FilialServices.deleteFilial(cnpj, req.profileId);
    if (deleted[1] !== true) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(deleted[0]);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertFilial,
  getFiliais,
  selectFilial,
  deleteFilial,
};
