const FilialCredServices = require("../../../services/Credenciamento/Credencial/Filial");

const insertCredFilial = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await FilialCredServices.insertCredFilial([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getCredFiliais = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const filiais = await FilialCredServices.getCredFiliais();
    res.status(200).json(filiais);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredFilial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const filial = await FilialCredServices.selectCredFilial(cnpj);
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

const deleteCredFilial = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;

  try {
    const deleted = await FilialCredServices.deleteCredFilial(cnpj, req.profileId);
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
  insertCredFilial,
  getCredFiliais,
  selectCredFilial,
  deleteCredFilial,
};
