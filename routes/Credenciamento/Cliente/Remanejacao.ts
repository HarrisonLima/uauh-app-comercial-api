import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Remanejacao");

router.use(authToken);

router.get("/credenciamentos/clientes/remanejacoes", ClienteController.getRemanejacoes);
router.get("/credenciamentos/clientes/remanejacoes/:cnpj", ClienteController.selectRemanejacao);
router.put(
  "/credenciamentos/clientes/remanejacoes/:cnpj",
  ClienteController.updateRemanejacao
);

module.exports = router;
