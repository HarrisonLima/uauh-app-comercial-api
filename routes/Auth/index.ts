import express from "express";
import verifyToken from "../../token/verifytoken";

const router = express.Router();
const AuthController = require("../../controllers/Auth/Auth");

router.post("/auth", AuthController.auth);
router.post("/auth-no-acess", AuthController.getUser)
router.post("/token", verifyToken);

module.exports = router;
