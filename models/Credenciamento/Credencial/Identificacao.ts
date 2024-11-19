import IIdentificacao from "./../../../interfaces/Credenciamento/Credencial/Identificacao";

class Identificacao implements IIdentificacao {
  constructor(
    public simplesNacional: boolean,
    public cnpj: string,
    public razaoSocial: string,
    public inscricaoEstadual: string,
    public ramoAtividade: string,
    public nomeFantasia: string,
    public telefone: string,
    public email: string,
    public emailFinanceiro?: string,
    public matriz?: string
  ) {}
}

export default Identificacao;
