import TSituacao from "../../types/TSituacao";

export default interface IPerfilAcesso {
  perfilAcesso: string;
  situacao?: TSituacao;
}