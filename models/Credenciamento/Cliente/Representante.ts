import IRepresentante from "./../../../interfaces/Credenciamento/Cliente/Representante";

class Representante implements IRepresentante {
  constructor(
    public cliente: string | number,
    public nome: string,
    public cpf: string,
    public contatoComercial: boolean,
    public testemunha: boolean,
    public email: string,
    public telefone: string,
    public cargo: string
  ) {}
}

export default Representante;
