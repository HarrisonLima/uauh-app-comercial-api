import IStatus from '../../interfaces/Cadastro/IStatus'
import TSituacao from '../../types/TSituacao';

class Status implements IStatus {
  constructor(public status: string, public situacao?: TSituacao) {}
}

export default Status;