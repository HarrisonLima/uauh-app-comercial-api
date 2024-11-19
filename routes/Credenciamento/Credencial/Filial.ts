import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Filial");

router.use(authToken)

router.post("/credenciamentos/credenciais/filiais", CredencialController.insertCredFilial);
router.get("/credenciamentos/credenciais/filiais", CredencialController.getCredFiliais);
router.get("/credenciamentos/credenciais/filiais/:cnpj", CredencialController.selectCredFilial);
router.delete("/credenciamentos/credenciais/filiais/:cnpj", CredencialController.deleteCredFilial);

module.exports = router;
