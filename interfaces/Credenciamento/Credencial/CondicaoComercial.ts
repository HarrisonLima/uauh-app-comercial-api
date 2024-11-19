export default interface ICondicaoComercial {
  credencial: string | number;
  apuracao: number;
  pagamento: number;
  produto: {
    id: number;
    taxa: number;
  }[];
  tarifa: {
    id: number;
    valor: number;
    valorMin: number;
    valorMax: number;
    carencia: number;
    parcelas: number;
  };
}
