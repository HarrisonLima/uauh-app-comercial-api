import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Tecnologia");

router.use(authToken)

router.post("/credenciamentos/credencial/tecnologias", CredencialController.insertTecnologia);
router.get("/credenciamentos/credencial/tecnologias", CredencialController.getTecnologias);
router.get("/credenciamentos/credencial/tecnologias/:cnpj", CredencialController.selectTecnologia);
router.put("/credenciamentos/credencial/tecnologias/:cnpj", CredencialController.updateTecnologia);
router.delete("/credenciamentos/credencial/tecnologias/:cnpj", CredencialController.deleteTecnologia);

module.exports = router;
