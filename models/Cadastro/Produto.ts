import IProduto from '../../interfaces/Cadastro/IProduto'
import TSituacao from '../../types/TSituacao';

class Produto implements IProduto {
  constructor(public produto: string, public situacao?: TSituacao) {}
}

export default Produto;