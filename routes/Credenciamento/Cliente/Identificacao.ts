import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Identificacao");

router.use(authToken)

router.post("/credenciamentos/clientes/identificacoes", ClienteController.insertIdentificacao);
router.get("/credenciamentos/clientes/identificacoes", ClienteController.getIdentificacoes);
router.get("/credenciamentos/clientes/identificacoes/:cnpj", ClienteController.selectIdentificacao);
router.put("/credenciamentos/clientes/identificacoes/:cnpj", ClienteController.updateIdentificacao);
router.delete("/credenciamentos/clientes/identificacoes/:cnpj", ClienteController.deleteIdentificacao);

module.exports = router;
