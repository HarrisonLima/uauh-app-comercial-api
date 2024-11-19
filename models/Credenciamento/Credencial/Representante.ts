import IRepresentante from "./../../../interfaces/Credenciamento/Credencial/Representante";

class Representante implements IRepresentante {
  constructor(
    public credencial: string | number,
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
