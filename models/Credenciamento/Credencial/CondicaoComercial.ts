import ICondicaoComercial from "./../../../interfaces/Credenciamento/Credencial/CondicaoComercial";

class CondicaoComercial implements ICondicaoComercial {
  constructor(
    public credencial: string | number,
    public apuracao: number,
    public pagamento: number,
    public produto: {
      id: number;
      taxa: number;
    }[],
    public tarifa: {
      id: number;
      valor: number;
      valorMin: number;
      valorMax: number;
      carencia: number;
      parcelas: number;
    }
  ) {}
}

export default CondicaoComercial;
