import ICondicaoComercial from "../../../interfaces/Credenciamento/Cliente/CondicaoComercial";

class CondicaoComercial implements ICondicaoComercial {
  constructor(
    public cliente: string | number,
    public produto: number,
    public tipoPagamento: string,
    public faturamento: string,
    public rede: string,
    public saqueIncluso: boolean,
    public apuracao: number,
    public pagamento: number,
    public taxa: number,
    public limite: number,
    public adesao: number,
    public emissao: number,
    public segundaVia: number
  ) {}
}

export default CondicaoComercial;
