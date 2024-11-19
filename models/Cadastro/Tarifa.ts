import ITarifa from '../../interfaces/Cadastro/ITarifa'
import TSituacao from '../../types/TSituacao';

class Tarifa implements ITarifa {
  constructor(public tarifa: string, public situacao?: TSituacao) {}
}

export default Tarifa;