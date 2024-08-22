import UsuarioModel from "../../models/Cadastro/Usuario";

const UsuarioRepository = require("../../repositories/Cadastro/Usuario");

const insertUsuario = async (req: any): Promise<any> => {
  const usuario = new UsuarioModel(
    req[0].perfilAcesso,
    req[0].usuario,
    req[0].senha,
    req[0].nome
  );
  const userId = req[1];
  return await UsuarioRepository.insertUsuario([usuario, userId]);
};

const getUsuarios = async (): Promise<any | undefined> => {
  const usuarios = await UsuarioRepository.getUsuarios();
  return usuarios;
};

const selectUsuario = async (id: number): Promise<any> => {
  const usuario = await UsuarioRepository.selectUsuario(id);
  return usuario;
};

const updateUsuario = async (id: number, req: any): Promise<any> => {
  const usuario = new UsuarioModel(req[0].perfilAcesso, req[0].usuario, req[0].senha, req[0].nome, req[0].situacao);
  const userId = req[1];
  return await UsuarioRepository.updateUsuario(id, [usuario, userId]);
};

module.exports = {
  insertUsuario,
  getUsuarios,
  selectUsuario,
  updateUsuario,
};
