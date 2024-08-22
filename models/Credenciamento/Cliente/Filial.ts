import IFilial from './../../../interfaces/Credenciamento/Cliente/Filial';

class Filial implements IFilial {
  constructor(public matriz: string, public filial: string) {}
}

export default Filial;
