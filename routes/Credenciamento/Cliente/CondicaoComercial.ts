import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/CondicaoComercial");

router.use(authToken)

router.post("/credenciamentos/clientes/condicoes-comerciais", ClienteController.insertCondicaoComercial);
router.get("/credenciamentos/clientes/condicoes-comerciais", ClienteController.getCondicoesComerciais);
router.get("/credenciamentos/clientes/condicoes-comerciais/:cnpj", ClienteController.selectCondicaoComercial);
router.put("/credenciamentos/clientes/condicoes-comerciais/:cnpj", ClienteController.updateCondicaoComercial);
router.delete("/credenciamentos/clientes/condicoes-comerciais/:cnpj", ClienteController.deleteCondicaoComercial);

module.exports = router;
