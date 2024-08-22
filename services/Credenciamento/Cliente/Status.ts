import StatusModel from "../../../models/Credenciamento/Cliente/Status";

const StatusRepository = require("../../../repositories/Credenciamento/Cliente/Status");

const getStatus = async (): Promise<any | undefined> => {
  const status = await StatusRepository.getStatus();
  return status;
};

const selectStatus = async (cnpj: string): Promise<any> => {
  const status = await StatusRepository.selectStatus(cnpj);
  return status;
};

const updateStatus = async (cnpj: string, req: any): Promise<any> => {
  const status = new StatusModel(
    req[0].status,
  );
  const userId = req[1];
  return await StatusRepository.updateStatus(cnpj, [
    status,
    userId,
  ]);
};

module.exports = {
  getStatus,
  selectStatus,
  updateStatus,
};
