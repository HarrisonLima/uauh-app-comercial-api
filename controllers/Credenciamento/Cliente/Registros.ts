const RegistrosServices = require("../../../services/Credenciamento/Cliente/Registros");

const getRegistros = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const registros = await RegistrosServices.getRegistrosServices();
    res.status(200).json(registros);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectRegistros = async (req: any, res: any): Promise<any> => {
  const cnpj = req.params.cnpj;
  try {
    const registro = await RegistrosServices.selectRegistrosServices(cnpj);
    if (!registro) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(registro);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  getRegistros,
  selectRegistros,
};
