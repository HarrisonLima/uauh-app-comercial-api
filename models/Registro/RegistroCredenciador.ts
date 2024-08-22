import IRegistroCredenciador from "../../interfaces/Registro/IRegistroCredenciador";

class RegistroCredenciador implements IRegistroCredenciador {
  constructor(
    public usuarioId: string | number,
    public credenciamentoId: string | number
  ) {}
}

export default RegistroCredenciador;
