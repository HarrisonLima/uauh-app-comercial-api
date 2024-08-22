const UsuarioServices = require("../../services/Cadastro/Usuario");

const insertUsuario = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await UsuarioServices.insertUsuario([
      req.body,
      req.profileId,
    ]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getUsuarios = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const bancos = await UsuarioServices.getUsuarios();
    res.status(200).json(bancos);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectUsuario = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await UsuarioServices.selectUsuario(id);
    if (!usuario) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateUsuario = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await UsuarioServices.updateUsuario(id, [
      req.body,
      req.profileId,
    ]);
    res.status(201).json(resultado);
  } catch (error: any) {
        res.status(500).json({ error });
  }
};

module.exports = {
  insertUsuario,
  getUsuarios,
  selectUsuario,
  updateUsuario,
};
