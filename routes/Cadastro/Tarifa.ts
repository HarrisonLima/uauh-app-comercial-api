import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const TarifaController = require("../../controllers/Cadastro/Tarifa");

router.use(authToken)

router.post("/tarifas", TarifaController.insertTarifa);
router.get("/tarifas", TarifaController.getTarifas);
router.get("/tarifas/:id", TarifaController.selectTarifa);
router.put("/tarifas/:id", TarifaController.updateTarifa);

module.exports = router;