import IObservacao from "../../../interfaces/Credenciamento/Credencial/Observacao";

class Observacao implements IObservacao {
  constructor(public credencial: string, public observacao: string) {}
}

export default Observacao;
