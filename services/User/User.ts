const UserRepository = require("../../repositories/User/User");

const resetPasswordService = async (id: number, req: any): Promise<any> => {
  const userId = req;
  return await UserRepository.resetPassword(id, userId);
};

module.exports = {
  resetPasswordService,
};
