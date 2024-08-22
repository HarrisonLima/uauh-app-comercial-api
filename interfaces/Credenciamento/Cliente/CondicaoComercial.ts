export default interface ICondicaoComercial {
  cliente: string | number;
  produto: number;
  tipoPagamento: string;
  faturamento: string;
  rede: string;
  saqueIncluso: boolean;
  apuracao: number;
  pagamento: number;
  taxa: number;
  limite: number;
  adesao: number;
  emissao: number;
  segundaVia: number;
}
