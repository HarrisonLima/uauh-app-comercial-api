import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Registros");

router.use(authToken);

router.get(
  "/credenciamentos/clientes/registros",
  ClienteController.getRegistros
);
router.get(
  "/credenciamentos/clientes/registros/:cnpj",
  ClienteController.selectRegistros
);
module.exports = router;
