import IFilial from './../../../interfaces/Credenciamento/Credencial/Filial';

class Filial implements IFilial {
  constructor(public matriz: string, public filial: string) {}
}

export default Filial;
