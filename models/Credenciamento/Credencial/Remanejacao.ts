import IRemanejacao from "../../../interfaces/Credenciamento/Credencial/Remanejacao";

class Remanejacao implements IRemanejacao {
  constructor(public remanejado: string | number) {}
}

export default Remanejacao;
