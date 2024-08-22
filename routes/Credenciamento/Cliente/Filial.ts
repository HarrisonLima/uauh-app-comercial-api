import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Filial");

router.use(authToken)

router.post("/credenciamentos/clientes/filiais", ClienteController.insertFilial);
router.get("/credenciamentos/clientes/filiais", ClienteController.getFiliais);
router.get("/credenciamentos/clientes/filiais/:cnpj", ClienteController.selectFilial);
router.delete("/credenciamentos/clientes/filiais/:cnpj", ClienteController.deleteFilial);

module.exports = router;
