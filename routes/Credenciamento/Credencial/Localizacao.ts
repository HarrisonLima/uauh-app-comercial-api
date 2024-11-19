import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Localizacao");

router.use(authToken)

router.get("/credenciamentos/credenciais/localizacoes", CredencialController.getCredLocalizacoes);
router.get("/credenciamentos/credenciais/localizacoes/:cnpj", CredencialController.selectCredLocalizacao);
router.put("/credenciamentos/credenciais/localizacoes/:cnpj", CredencialController.updateCredLocalizacao);

module.exports = router;
