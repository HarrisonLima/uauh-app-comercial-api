import IObservacao from "../../../interfaces/Credenciamento/Cliente/Observacao";

class Observacao implements IObservacao {
  constructor(public cliente: string, public observacao: string) {}
}

export default Observacao;
