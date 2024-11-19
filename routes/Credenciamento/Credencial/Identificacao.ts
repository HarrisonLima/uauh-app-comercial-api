import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Identificacao");

router.use(authToken)

router.post("/credenciamentos/credenciais/identificacoes", CredencialController.insertIdentificacao);
router.get("/credenciamentos/credenciais/identificacoes", CredencialController.getIdentificacoes);
router.get("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.selectIdentificacao);
router.put("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.updateIdentificacao);
router.delete("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.deleteIdentificacao);

module.exports = router;
