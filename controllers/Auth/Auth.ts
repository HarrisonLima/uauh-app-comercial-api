const AuthService = require("../../services/Auth/Auth");

const auth = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await AuthService.auth(req.body);
    res.status(201).json(resultado);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const getUser = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await AuthService.getUser(req.body);
    res.status(200).json(resultado);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  auth,
  getUser,
};
