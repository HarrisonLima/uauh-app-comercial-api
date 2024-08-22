import RepresentanteModel from "../../../models/Credenciamento/Cliente/Representante";

const RepresentanteRepository = require("../../../repositories/Credenciamento/Cliente/Representante");

const insertRepresentante = async (req: any): Promise<any> => {
  const representante = new RepresentanteModel(
    req[0].cliente,
    req[0].nome,
    req[0].cpf,
    req[0].contatoComercial,
    req[0].testemunha,
    req[0].email,
    req[0].telefone,
    req[0].cargo
  );

  const userId = req[1];
  return await RepresentanteRepository.insertRepresentante([
    representante,
    userId,
  ]);
};

const getRepresentantes = async (): Promise<any | undefined> => {
  const representantes = await RepresentanteRepository.getRepresentantes();
  return representantes;
};

const selectRepresentante = async (cnpj: string): Promise<any> => {
  const representante = await RepresentanteRepository.selectRepresentante(cnpj);
  return representante;
};

const updateRepresentante = async (cpf: string, req: any): Promise<any> => {
  const representante = new RepresentanteModel(
    req[0][0].cliente,
    req[0][0].nome,
    req[0][0].cpf,
    req[0][0].contatoComercial,
    req[0][0].testemunha,
    req[0][0].email,
    req[0][0].telefone,
    req[0][0].cargo
  );
  const userId = req[1];
  return await RepresentanteRepository.updateRepresentante(cpf, [
    representante,
    userId,
  ]);
};

const deleteRepresentante = async (cpf: string, req: any): Promise<any> => {
  const userId = req;
  const representante = await RepresentanteRepository.deleteRepresentante(
    cpf,
    userId
  );
  return representante;
};

module.exports = {
  insertRepresentante,
  getRepresentantes,
  selectRepresentante,
  updateRepresentante,
  deleteRepresentante,
};
