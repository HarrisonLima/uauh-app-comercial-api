import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const UserController = require("../../controllers/User/User");

router.use(authToken);

router.put("/usuarios/redefinir-senha/:id", UserController.resetPassword);

module.exports = router;
