import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Representante");

router.use(authToken)

router.post("/credenciamentos/credenciais/representantes", CredencialController.insertRepresentante);
router.get("/credenciamentos/credenciais/representantes", CredencialController.getRepresentantes);
router.get("/credenciamentos/credenciais/representantes/:cnpj", CredencialController.selectRepresentante);
router.put("/credenciamentos/credenciais/representantes/:cpf", CredencialController.updateRepresentante);
router.delete("/credenciamentos/credenciais/representantes/:cpf", CredencialController.deleteRepresentante);

module.exports = router;
