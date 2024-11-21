const TecnologiaCredServices = require("../../../services/Credenciamento/Credencial/Tecnologia");

const insertCredTecnologia = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await TecnologiaCredServices.insertCredTecnologia([
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

const getCredTecnologias = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const tecnologias =
      await TecnologiaCredServices.getCredTecnologias();
    res.status(200).json(tecnologias);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const tecnologia =
      await TecnologiaCredServices.selectCredTecnologia(cnpj);
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

const updateCredTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const resultado = await TecnologiaCredServices.updateCredTecnologia(
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

const deleteCredTecnologia = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  const equipamento = req.query.equipamento;
  try {
    const deleted = await TecnologiaCredServices.deleteCredTecnologia(cnpj, [equipamento, req.profileId]);
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
  insertCredTecnologia,
  getCredTecnologias,
  selectCredTecnologia,
  updateCredTecnologia,
  deleteCredTecnologia,
};
