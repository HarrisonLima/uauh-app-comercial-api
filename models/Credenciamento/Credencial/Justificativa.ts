import IJustificativa from "../../../interfaces/Credenciamento/Credencial/Justificativa";

class Justificativa implements IJustificativa {
  constructor(public credencial: string | number, public status: string | number, public justificativa: string) {}
}

export default Justificativa;
