import IRemanejacao from "../../../interfaces/Credenciamento/Cliente/Remanejacao";

class Remanejacao implements IRemanejacao {
  constructor(public remanejado: string | number) {}
}

export default Remanejacao;
