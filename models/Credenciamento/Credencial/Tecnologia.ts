import ITecnologia from "./../../../interfaces/Credenciamento/Credencial/Tecnologia";

class Tecnologia implements ITecnologia {
  constructor(
    public credencial: string | number,
    public equipamento_id: number,
    public cnpj_equipamento: number,
    public ec_equipamento: number
  ) {}
}

export default Tecnologia;
