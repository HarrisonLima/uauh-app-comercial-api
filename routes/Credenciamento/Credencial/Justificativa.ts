import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Justificativa");

router.use(authToken)

router.post("/credenciamentos/credenciais/justificativas", CredencialController.insertCredJustificativa);
router.get("/credenciamentos/credenciais/justificativas", CredencialController.getCredJustificativas);
router.get("/credenciamentos/credenciais/justificativas/:cnpj", CredencialController.selectCredJustificativa);
router.delete("/credenciamentos/credenciais/justificativas/:cnpj", CredencialController.deleteCredJustificativa);

module.exports = router;
