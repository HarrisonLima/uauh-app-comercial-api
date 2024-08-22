import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const UsuarioController = require("../../controllers/Cadastro/Usuario");

router.use(authToken)

router.post("/usuarios", UsuarioController.insertUsuario);
router.get("/usuarios", UsuarioController.getUsuarios);
router.get("/usuarios/:id", UsuarioController.selectUsuario);
router.put("/usuarios/:id", UsuarioController.updateUsuario);

module.exports = router;