import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Justificativa");

router.use(authToken)

router.post("/credenciamentos/credenciais/justificativas", CredencialController.insertJustificativa);
router.get("/credenciamentos/credenciais/justificativas", CredencialController.getJustificativas);
router.get("/credenciamentos/credenciais/justificativas/:cnpj", CredencialController.selectJustificativa);
router.delete("/credenciamentos/credenciais/justificativas/:cnpj", CredencialController.deleteJustificativa);

module.exports = router;
