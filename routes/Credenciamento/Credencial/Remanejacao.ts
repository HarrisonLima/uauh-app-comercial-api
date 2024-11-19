import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Remanejacao");

router.use(authToken);

router.get("/credenciamentos/credenciais/remanejacoes", CredencialController.getRemanejacoes);
router.get("/credenciamentos/credenciais/remanejacoes/:cnpj", CredencialController.selectRemanejacao);
router.put(
  "/credenciamentos/credenciais/remanejacoes/:cnpj",
  CredencialController.updateRemanejacao
);

module.exports = router;
