const UserService = require("../../services/User/User");

const resetPassword = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await UserService.resetPasswordService(id, req.profileId);
    res.status(201).json(resultado);
  } catch (error: any) {
        res.status(500).json({ error });
  }
};

module.exports = {
  resetPassword,
};
