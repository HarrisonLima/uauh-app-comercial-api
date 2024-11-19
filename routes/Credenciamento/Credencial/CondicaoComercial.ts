import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/CondicaoComercial");

router.use(authToken)

router.post("/credenciamentos/credenciais/condicoes-comerciais", CredencialController.insertCredCondicaoComercial);
router.get("/credenciamentos/credenciais/condicoes-comerciais", CredencialController.getCredCondicoesComerciais);
router.get("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.selectCredCondicaoComercial);
router.put("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.updateCredCondicaoComercial);
router.delete("/credenciamentos/credenciais/condicoes-comerciais/:cnpj", CredencialController.deleteCredCondicaoComercial);

module.exports = router;
