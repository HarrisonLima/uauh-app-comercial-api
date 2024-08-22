import TSituacao from "../../types/TSituacao";

export default interface IProduto {
  produto: string;
  situacao?: TSituacao;
}