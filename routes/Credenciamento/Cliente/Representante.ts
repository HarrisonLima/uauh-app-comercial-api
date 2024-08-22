import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Representante");

router.use(authToken)

router.post("/credenciamentos/clientes/representantes", ClienteController.insertRepresentante);
router.get("/credenciamentos/clientes/representantes", ClienteController.getRepresentantes);
router.get("/credenciamentos/clientes/representantes/:cnpj", ClienteController.selectRepresentante);
router.put("/credenciamentos/clientes/representantes/:cpf", ClienteController.updateRepresentante);
router.delete("/credenciamentos/clientes/representantes/:cpf", ClienteController.deleteRepresentante);

module.exports = router;
