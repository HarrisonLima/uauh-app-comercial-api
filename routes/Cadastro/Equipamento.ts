import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const EquipamentoController = require("../../controllers/Cadastro/Equipamento");

router.use(authToken)

router.post("/equipamentos", EquipamentoController.insertEquipamento);
router.get("/equipamentos", EquipamentoController.getEquipamentos);
router.get("/equipamentos/:id", EquipamentoController.selectEquipamento);
router.put("/equipamentos/:id", EquipamentoController.updateEquipamento);

module.exports = router;