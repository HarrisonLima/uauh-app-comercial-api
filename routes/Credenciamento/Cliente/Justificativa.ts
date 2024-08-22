import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Justificativa");

router.use(authToken)

router.post("/credenciamentos/clientes/justificativas", ClienteController.insertJustificativa);
router.get("/credenciamentos/clientes/justificativas", ClienteController.getJustificativas);
router.get("/credenciamentos/clientes/justificativas/:cnpj", ClienteController.selectJustificativa);
router.delete("/credenciamentos/clientes/justificativas/:cnpj", ClienteController.deleteJustificativa);

module.exports = router;
