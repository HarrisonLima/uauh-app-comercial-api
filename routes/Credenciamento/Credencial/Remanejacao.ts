import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Remanejacao");

router.use(authToken);

router.get(
  "/credenciamentos/credenciais/remanejacoes",
  CredencialController.getCredRemanejacoes
);
router.get(
  "/credenciamentos/credenciais/remanejacoes/:cnpj",
  CredencialController.selectCredRemanejacao
);
router.put(
  "/credenciamentos/credenciais/remanejacoes/:cnpj",
  CredencialController.updateCredRemanejacao
);

module.exports = router;
