import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/DadosBancarios");

router.use(authToken)

router.post("/credenciamentos/credenciais/dados-bancarios", CredencialController.insertDadosBancarios);
router.get("/credenciamentos/credenciais/dados-bancarios", CredencialController.getDadosBancarios);
router.get("/credenciamentos/credenciais/dados-bancarios/:cnpj", CredencialController.selectDadosBancarios);
router.put("/credenciamentos/credenciais/dados-bancarios/:cnpj", CredencialController.updateDadosBancarios);

module.exports = router;
