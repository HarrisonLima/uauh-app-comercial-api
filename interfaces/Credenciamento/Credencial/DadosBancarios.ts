export default interface IDadosBancarios {
  credencial: string | number;
  titular_proprio: boolean;
  nome_titular: string;
  documento_titular: string;
  tipo_conta: string;
  banco: string;
  agencia: string;
  conta: string;
  chave_pix?: string;
}
