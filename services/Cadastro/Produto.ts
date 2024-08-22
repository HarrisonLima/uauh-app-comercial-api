import ProdutoModel from "../../models/Cadastro/Produto";

const ProdutoRepository = require("../../repositories/Cadastro/Produto");

const insertProduto = async (req: any): Promise<any> => {
  const produto = new ProdutoModel(req[0].produto);
  const userId = req[1];
  return await ProdutoRepository.insertProduto([produto, userId]);
};

const getProdutos = async (): Promise<any | undefined> => {
  const produtos = await ProdutoRepository.getProdutos();
  return produtos;
};

const selectProduto = async (id: number): Promise<any> => {
  const produto = await ProdutoRepository.selectProduto(id);
  return produto;
};

const updateProduto = async (id: number, req: any): Promise<any> => {
  const produto = new ProdutoModel(req[0].produto, req[0].situacao);
  const userId = req[1];
  return await ProdutoRepository.updateProduto(id, [produto, userId]);
};

module.exports = {
  insertProduto,
  getProdutos,
  selectProduto,
  updateProduto,
};