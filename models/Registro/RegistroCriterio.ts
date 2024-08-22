import IRegistroCriterio from "../../interfaces/Registro/IRegistroCriterio";
import TOperacoes from "../../types/TOperacoes";

class RegistroCriterio implements IRegistroCriterio {
  constructor(
    public usuarioId: string | number,
    public itemId: string | number,
    public item: string,
    public operacao: TOperacoes,
    public credenciamentoId?: string | number
  ) {}
}

export default RegistroCriterio;
