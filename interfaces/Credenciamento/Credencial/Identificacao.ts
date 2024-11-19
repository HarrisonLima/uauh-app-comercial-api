export default interface IIdentificacao {
  simplesNacional: boolean;
  cnpj: string;
  razaoSocial: string;
  inscricaoEstadual: string;
  ramoAtividade: string;
  nomeFantasia: string;
  telefone: string;
  email: string;
  emailFinanceiro?: string;
  matriz?: string;
}
