import IStatus from "../../../interfaces/Credenciamento/Cliente/Status";

class Status implements IStatus {
  constructor(public status: string) {}
}

export default Status;
