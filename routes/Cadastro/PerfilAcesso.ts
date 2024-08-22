import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const PerfilAcessoController = require("../../controllers/Cadastro/PerfilAcesso");

router.use(authToken)

router.post("/perfis", PerfilAcessoController.insertPerfilAcesso);
router.get("/perfis", PerfilAcessoController.getPerfisAcesso);
router.get("/perfis/:id", PerfilAcessoController.selectPerfilAcesso);
router.put("/perfis/:id", PerfilAcessoController.updatePerfilAcesso);

module.exports = router;