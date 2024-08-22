import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const ClienteController = require("../../../controllers/Credenciamento/Cliente/Localizacao");

router.use(authToken)

router.get("/credenciamentos/clientes/localizacoes", ClienteController.getLocalizacoes);
router.get("/credenciamentos/clientes/localizacoes/:cnpj", ClienteController.selectLocalizacao);
router.put("/credenciamentos/clientes/localizacoes/:cnpj", ClienteController.updateLocalizacao);

module.exports = router;
