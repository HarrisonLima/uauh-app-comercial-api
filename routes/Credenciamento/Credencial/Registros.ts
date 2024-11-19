import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Registros");

router.use(authToken);

router.get(
  "/credenciamentos/credenciais/registros",
  CredencialController.getCredRegistros
);
router.get(
  "/credenciamentos/credenciais/registros/:cnpj",
  CredencialController.selectCredRegistros
);
module.exports = router;
