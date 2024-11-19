import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Status");

router.use(authToken)

router.get("/credenciamentos/credenciais/status", CredencialController.getCredStatus);
router.get("/credenciamentos/credenciais/status/:cnpj", CredencialController.selectCredStatus);
router.put("/credenciamentos/credenciais/status/:cnpj", CredencialController.updateCredStatus);

module.exports = router;
