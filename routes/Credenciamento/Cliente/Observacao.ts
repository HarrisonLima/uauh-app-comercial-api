import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Observacao");

router.use(authToken)

router.post("/credenciamentos/clientes/observacoes", ClienteController.insertObservacao);
router.get("/credenciamentos/clientes/observacoes", ClienteController.getObservacoes);
router.get("/credenciamentos/clientes/observacoes/:cnpj", ClienteController.selectObservacao);
router.put("/credenciamentos/clientes/observacoes/:cnpj", ClienteController.updateObservacao);
router.delete("/credenciamentos/clientes/observacoes/:cnpj", ClienteController.deleteObservacao);

module.exports = router;
 