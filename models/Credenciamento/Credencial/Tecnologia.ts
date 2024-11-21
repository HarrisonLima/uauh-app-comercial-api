import ITecnologia from "./../../../interfaces/Credenciamento/Credencial/Tecnologia";

class Tecnologia implements ITecnologia {
  constructor(
    public credencial: string | number,
    public idEquipamento: number,
    public cnpjEquipamento: number,
    public ecEquipamento: number
  ) {}
}

export default Tecnologia;
