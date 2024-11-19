import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Representante");

router.use(authToken)

router.post("/credenciamentos/credenciais/representantes", CredencialController.insertCredRepresentante);
router.get("/credenciamentos/credenciais/representantes", CredencialController.getCredRepresentantes);
router.get("/credenciamentos/credenciais/representantes/:cnpj", CredencialController.selectCredRepresentante);
router.put("/credenciamentos/credenciais/representantes/:cpf", CredencialController.updateCredRepresentante);
router.delete("/credenciamentos/credenciais/representantes/:cpf", CredencialController.deleteCredRepresentante);

module.exports = router;
