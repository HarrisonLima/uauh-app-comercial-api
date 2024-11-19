import StatusModel from "../../../models/Credenciamento/Credencial/Status";

const StatusCredRepository = require("../../../repositories/Credenciamento/Credencial/Status");

const getCredStatus = async (): Promise<any | undefined> => {
  const status = await StatusCredRepository.getStatus();
  return status;
};

const selectCredStatus = async (cnpj: string): Promise<any> => {
  const status = await StatusCredRepository.selectStatus(cnpj);
  return status;
};

const updateCredStatus = async (cnpj: string, req: any): Promise<any> => {
  const status = new StatusModel(
    req[0].status,
  );
  const userId = req[1];
  return await StatusCredRepository.updateStatus(cnpj, [
    status,
    userId,
  ]);
};

module.exports = {
  getCredStatus,
  selectCredStatus,
  updateCredStatus,
};
