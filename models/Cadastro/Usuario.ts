import IUsuario from '../../interfaces/Cadastro/IUsuario'
import TSituacao from '../../types/TSituacao';

class Usuario implements IUsuario {
  constructor(public perfilAcesso: number | string, public usuario: string, public senha: string, public nome: string, public situacao?: TSituacao) {}
}

export default Usuario;