import express from "express";
import authToken from "../../../middleware/authToken";

const router = express.Router();
const CredenciailController = require("../../../controllers/Credenciamento/Crendencial/Filial");

router.use(authToken)

router.post("/credenciamentos/credenciais/filiais", CredenciailController.insertFilial);
router.get("/credenciamentos/credenciais/filiais", CredenciailController.getFiliais);
router.get("/credenciamentos/credenciais/filiais/:cnpj", CredenciailController.selectFilial);
router.delete("/credenciamentos/credenciais/filiais/:cnpj", CredenciailController.deleteFilial);

module.exports = router;
