import StatusModel from "../../models/Cadastro/Status";

const StatusRepository = require("../../repositories/Cadastro/Status");

const insertStatus = async (req: any): Promise<any> => {
  const status = new StatusModel(req[0].status);
  const userId = req[1];
  return await StatusRepository.insertStatus([status, userId]);
};

const getStatus = async (): Promise<any | undefined> => {
  const status = await StatusRepository.getStatus();
  return status;
};

const selectStatus = async (id: number): Promise<any> => {
  const status = await StatusRepository.selectStatus(id);
  return status;
};

const updateStatus = async (id: number, req: any): Promise<any> => {
  const status = new StatusModel(req[0].status, req[0].situacao);
  const userId = req[1];
  return await StatusRepository.updateStatus(id, [status, userId]);
};

module.exports = {
  insertStatus,
  getStatus,
  selectStatus,
  updateStatus,
};
