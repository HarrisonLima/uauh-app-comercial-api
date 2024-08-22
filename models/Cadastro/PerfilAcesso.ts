import IPerfilAcesso from '../../interfaces/Cadastro/IPerfilAcesso'
import TSituacao from "../../types/TSituacao";

class PerfilAcesso implements IPerfilAcesso {
  constructor(public perfilAcesso: string, public situacao?: TSituacao) {}
}

export default PerfilAcesso;