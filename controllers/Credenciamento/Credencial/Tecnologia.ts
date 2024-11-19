const TecnologiaServices = require("../../../services/Credenciamento/Credencial/Tecnologia");

const insertTecnologia = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await TecnologiaServices.insertTecnologia([
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

const getTecnologias = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const tecnologias =
      await TecnologiaServices.getTecnologias();
    res.status(200).json(tecnologias);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const tecnologia =
      await TecnologiaServices.selectTecnologia(cnpj);
    if (!tecnologia) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(tecnologia);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await TecnologiaServices.updateTecnologia(
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

const deleteTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const deleted = await TecnologiaServices.deleteTecnologia(cnpj, [req.tecnologia, req.profileId]);
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
  insertTecnologia,
  getTecnologias,
  selectTecnologia,
  updateTecnologia,
  deleteTecnologia,
};
