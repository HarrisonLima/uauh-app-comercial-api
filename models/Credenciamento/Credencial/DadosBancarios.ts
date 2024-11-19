import IDadosBancarios from "../../../interfaces/Credenciamento/Credencial/DadosBancarios";

class DadosBancarios implements IDadosBancarios {
  constructor(
    public credencial: string | number,
    public titular_proprio: boolean,
    public nome_titular: string,
    public documento_titular: string,
    public tipo_conta: string,
    public banco: string,
    public agencia: string,
    public conta: string,
    public chave_pix?: string
  ) {}
}

export default DadosBancarios;
