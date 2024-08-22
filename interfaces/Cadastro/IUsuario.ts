import TSituacao from "../../types/TSituacao";

export default interface IUsuario {
  usuario: string;
  senha: string;
  nome: string;
  perfilAcesso: number | string;
  situacao?: TSituacao;
}