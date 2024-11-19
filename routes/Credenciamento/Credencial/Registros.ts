import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredencialController = require("../../../controllers/Credenciamento/Credencial/Registros");

router.use(authToken);

router.get(
  "/credenciamentos/credenciais/registros",
  CredencialController.getRegistros
);
router.get(
  "/credenciamentos/credenciais/registros/:cnpj",
  CredencialController.selectRegistros
);
module.exports = router;
