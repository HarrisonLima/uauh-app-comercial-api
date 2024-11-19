const RepresentanteCredServices = require("../../../services/Credenciamento/Credencial/Representante");

const insertCredRepresentante = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await RepresentanteCredServices.insertCredRepresentante(
      [req.body, req.profileId]
    );
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getCredRepresentantes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const representantes = await RepresentanteCredServices.getCredRepresentantes();
    res.status(200).json(representantes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectCredRepresentante = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const representante = await RepresentanteCredServices.selectCredRepresentante(cnpj);
    if (!representante) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(representante);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateCredRepresentante = async (req: any, res: any): Promise<any> => {
  const cpf = req.params.cpf;
  
  try {
    const resultado = await RepresentanteCredServices.updateCredRepresentante(
      cpf,
      [[req.body, req.profileId], req.profileId]
    );
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const deleteCredRepresentante = async (req: any, res: any): Promise<any> => {
  const cpf = req.params.cpf;

  try {
    const deleted = await RepresentanteCredServices.deleteCredRepresentante(cpf, req.profileId);
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
  insertCredRepresentante,
  getCredRepresentantes,
  selectCredRepresentante,
  updateCredRepresentante,
  deleteCredRepresentante
};
