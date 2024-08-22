import AuthModel from "../../models/Auth/Auth";

const AuthRepository = require("../../auth");

const auth = async (req: any): Promise<any> => {
  const user = new AuthModel(req.user, req.password);
  return await AuthRepository.auth(user);
};

const getUser = async (req: any): Promise<any | undefined> => {
  const user = new AuthModel(req.user, req.password);
  const resultado = await AuthRepository.getUser(user);
  return resultado;
};

module.exports = {
  auth,
  getUser,
};
