import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Status");

router.use(authToken)

router.get("/credenciamentos/clientes/status", ClienteController.getClientesStatus);
router.get("/credenciamentos/clientes/status/:cnpj", ClienteController.selectClientesStatus);
router.put("/credenciamentos/clientes/status/:cnpj", ClienteController.updateClientesStatus);

module.exports = router;
