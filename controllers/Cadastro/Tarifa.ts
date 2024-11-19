const TarifaServices = require("../../services/Cadastro/Tarifa");

const insertTarifa = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await TarifaServices.insertTarifa([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getTarifas = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const Tarifas = await TarifaServices.getTarifas();
    res.status(200).json(Tarifas);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectTarifa = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const Tarifa = await TarifaServices.selectTarifa(id);
    if (!Tarifa) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(Tarifa);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateTarifa = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await TarifaServices.updateTarifa(id, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertTarifa,
  getTarifas,
  selectTarifa,
  updateTarifa,
};
