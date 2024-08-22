const RepresentanteServices = require("../../../services/Credenciamento/Cliente/Representante");

const insertRepresentante = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await RepresentanteServices.insertRepresentante(
      [req.body, req.profileId]
    );
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getRepresentantes = async (
  _: any,
  res: any
): Promise<any | undefined> => {
  try {
    const representantes = await RepresentanteServices.getRepresentantes();
    res.status(200).json(representantes);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectRepresentante = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const representante = await RepresentanteServices.selectRepresentante(cnpj);
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

const updateRepresentante = async (req: any, res: any): Promise<any> => {
  const cpf = req.params.cpf;
  
  try {
    const resultado = await RepresentanteServices.updateRepresentante(
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

const deleteRepresentante = async (req: any, res: any): Promise<any> => {
  const cpf = req.params.cpf;

  try {
    const deleted = await RepresentanteServices.deleteRepresentante(cpf, req.profileId);
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
  insertRepresentante,
  getRepresentantes,
  selectRepresentante,
  updateRepresentante,
  deleteRepresentante
};
