import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/CondicaoComercial");

router.use(authToken)

router.post("/credenciamentos/credenciais/condicoes-comerciais", CredencialController.insertCondicaoComercial);
router.get("/credenciamentos/credenciais/condicoes-comerciais", CredencialController.getCondicoesComerciais);
router.get("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.selectCondicaoComercial);
router.put("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.updateCondicaoComercial);
router.delete("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.deleteCondicaoComercial);

module.exports = router;
