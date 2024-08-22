import IJustificativa from "../../../interfaces/Credenciamento/Cliente/Justificativa";

class Justificativa implements IJustificativa {
  constructor(public cliente: string | number, public status: string | number, public justificativa: string) {}
}

export default Justificativa;
