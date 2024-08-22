import PerfilAcessoModel from "../../models/Cadastro/PerfilAcesso";

const PerfilAcessoRepository = require("../../repositories/Cadastro/PerfilAcesso");

const insertPerfilAcesso = async (req: any): Promise<any> => {
  const perfilAcesso = new PerfilAcessoModel(req[0].perfilAcesso);
  const userId = req[1];
  return await PerfilAcessoRepository.insertPerfilAcesso([perfilAcesso, userId]);
};

const getPerfisAcesso = async (): Promise<any | undefined> => {
  const perfisAcesso = await PerfilAcessoRepository.getPerfisAcesso();
  return perfisAcesso;
};

const selectPerfilAcesso = async (id: number): Promise<any> => {
  const perfilAcesso = await PerfilAcessoRepository.selectPerfilAcesso(id);
  return perfilAcesso;
};

const updatePerfilAcesso = async (id: number, req: any): Promise<any> => {
  const perfilAcesso = new PerfilAcessoModel(req[0].perfilAcesso, req[0].situacao);
  const userId = req[1];
  return await PerfilAcessoRepository.updatePerfilAcesso(id, [perfilAcesso, userId]);
};

module.exports = {
  insertPerfilAcesso,
  getPerfisAcesso,
  selectPerfilAcesso,
  updatePerfilAcesso,
};
