import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Observacao");

router.use(authToken)

router.post("/credenciamentos/credenciais/observacoes", CredencialController.insertObservacao);
router.get("/credenciamentos/credenciais/observacoes", CredencialController.getObservacoes);
router.get("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.selectObservacao);
router.put("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.updateObservacao);
router.delete("/credenciamentos/credenciais/observacoes/:cnpj", CredencialController.deleteObservacao);

module.exports = router;
 