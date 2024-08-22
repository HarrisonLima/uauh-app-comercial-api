import TOperacoes from "../../types/TOperacoes";

export default interface IRegistroCriterio {
  usuarioId: string | number;
  credenciamentoId?: string | number;
  itemId: string | number;
  item: string;
  operacao: TOperacoes;
}
