import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Localizacao");

router.use(authToken)

router.get("/credenciamentos/credenciais/localizacoes", CredencialController.getLocalizacoes);
router.get("/credenciamentos/credenciais/localizacoes/:cnpj", CredencialController.selectLocalizacao);
router.put("/credenciamentos/credenciais/localizacoes/:cnpj", CredencialController.updateLocalizacao);

module.exports = router;
