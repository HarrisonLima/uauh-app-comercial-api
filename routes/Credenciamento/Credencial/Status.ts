import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Status");

router.use(authToken)

router.get("/credenciamentos/credenciais/status", CredencialController.getCredenciaisStatus);
router.get("/credenciamentos/credenciais/status/:cnpj", CredencialController.selectCredencialStatus);
router.put("/credenciamentos/credenciais/status/:cnpj", CredencialController.updateCredencialStatus);

module.exports = router;
