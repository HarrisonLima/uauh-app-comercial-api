import RepresentanteModel from "../../../models/Credenciamento/Credencial/Representante";

const RepresentanteCredRepository = require("../../../repositories/Credenciamento/Credencial/Representante");

const insertCredRepresentante = async (req: any): Promise<any> => {
  const representante = new RepresentanteModel(
    req[0].credencial,
    req[0].nome,
    req[0].cpf,
    req[0].contatoComercial,
    req[0].testemunha,
    req[0].email,
    req[0].telefone,
    req[0].cargo
  );

  const userId = req[1];
  return await RepresentanteCredRepository.insertRepresentante([
    representante,
    userId,
  ]);
};

const getCredRepresentantes = async (): Promise<any | undefined> => {
  const representantes = await RepresentanteCredRepository.getRepresentantes();
  return representantes;
};

const selectCredRepresentante = async (cnpj: string): Promise<any> => {
  const representante = await RepresentanteCredRepository.selectRepresentante(cnpj);
  return representante;
};

const updateCredRepresentante = async (cpf: string, req: any): Promise<any> => {
  const representante = new RepresentanteModel(
    req[0][0].credencial,
    req[0][0].nome,
    req[0][0].cpf,
    req[0][0].contatoComercial,
    req[0][0].testemunha,
    req[0][0].email,
    req[0][0].telefone,
    req[0][0].cargo
  );
  const userId = req[1];
  return await RepresentanteCredRepository.updateRepresentante(cpf, [
    representante,
    userId,
  ]);
};

const deleteCredRepresentante = async (cpf: string, req: any): Promise<any> => {
  const userId = req;
  const representante = await RepresentanteCredRepository.deleteRepresentante(
    cpf,
    userId
  );
  return representante;
};

module.exports = {
  insertCredRepresentante,
  getCredRepresentantes,
  selectCredRepresentante,
  updateCredRepresentante,
  deleteCredRepresentante,
};
