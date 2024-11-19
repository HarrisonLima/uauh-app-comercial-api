import IEquipamento from '../../interfaces/Cadastro/IEquipamento'
import TSituacao from '../../types/TSituacao';

class Equipamento implements IEquipamento {
  constructor(public equipamento: string, public situacao?: TSituacao) {}
}

export default Equipamento;