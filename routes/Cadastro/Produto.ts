import express from "express";
import authToken from "../../middleware/authToken";

const router = express.Router();
const ProdutoController = require("../../controllers/Cadastro/Produto");

router.use(authToken)

router.post("/produtos", ProdutoController.insertProduto);
router.get("/produtos", ProdutoController.getProdutos);
router.get("/produtos/:id", ProdutoController.selectProduto);
router.put("/produtos/:id", ProdutoController.updateProduto);

module.exports = router;