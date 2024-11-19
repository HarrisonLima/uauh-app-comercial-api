import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Observacao");

router.use(authToken)

router.post("/credenciamentos/credenciais/observacoes", CredencialController.insertCredObservacao);
router.get("/credenciamentos/credenciais/observacoes", CredencialController.getCredObservacoes);
router.get("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.selectCredObservacao);
router.put("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.updateCredObservacao);
router.delete("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.deleteCredObservacao);

module.exports = router;
 