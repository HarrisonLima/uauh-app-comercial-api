import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const StatusController = require("../../controllers/Cadastro/Statuss");

router.use(authToken)

router.post("/status", StatusController.insertStatus);
router.get("/status", StatusController.getStatus);
router.get("/status/:id", StatusController.selectStatus);
router.put("/status/:id", StatusController.updateStatus);

module.exports = router;