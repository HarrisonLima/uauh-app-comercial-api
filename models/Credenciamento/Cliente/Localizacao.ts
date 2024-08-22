import ILocalizacao from "../../../interfaces/Credenciamento/Cliente/Localizacao";

class Localizacao implements ILocalizacao {
  constructor(
    public cliente: string | number,
    public cep: string,
    public cidade: string,
    public uf: string,
    public bairro: string,
    public numero: string,
    public endereco: string,
    public complemento: string,
    public coordenadas: string,
  ) {}
}

export default Localizacao;
