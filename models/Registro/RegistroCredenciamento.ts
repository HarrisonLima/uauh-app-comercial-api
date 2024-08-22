import IRegistroCredenciamento from "./../../interfaces/Registro/IRegistroCredenciamento";

class RegistroCredenciamento implements IRegistroCredenciamento {
  constructor(
    public usuarioId: string | number,
    public credenciamentoId: string | number,
    public operacao: string
  ) {}
}

export default RegistroCredenciamento;
