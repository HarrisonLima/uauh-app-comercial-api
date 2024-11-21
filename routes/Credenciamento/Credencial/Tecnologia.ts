import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Tecnologia");

router.use(authToken)

router.post("/credenciamentos/credenciais/tecnologias", CredencialController.insertCredTecnologia);
router.get("/credenciamentos/credenciais/tecnologias", CredencialController.getCredTecnologias);
router.get("/credenciamentos/credenciais/tecnologias/:cnpj", CredencialController.selectCredTecnologia);
router.put("/credenciamentos/credenciais/tecnologias/:cnpj", CredencialController.updateCredTecnologia);
router.delete("/credenciamentos/credenciais/tecnologias/:cnpj", CredencialController.deleteCredTecnologia);

module.exports = router;
