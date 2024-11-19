import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Identificacao");

router.use(authToken)

router.post("/credenciamentos/credenciais/identificacoes", CredencialController.insertCredIdentificacao);
router.get("/credenciamentos/credenciais/identificacoes", CredencialController.getCredIdentificacoes);
router.get("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.selectCredIdentificacao);
router.put("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.updateCredIdentificacao);
router.delete("/credenciamentos/credenciais/identificacoes/:cnpj", CredencialController.deleteCredIdentificacao);

module.exports = router;
