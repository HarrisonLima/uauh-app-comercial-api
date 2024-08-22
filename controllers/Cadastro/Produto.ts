const ProdutoServices = require("../../services/Cadastro/Produto");

const insertProduto = async (req: any, res: any): Promise<any> => {
  try {
    const resultado = await ProdutoServices.insertProduto([req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const getProdutos = async (_: any, res: any): Promise<any | undefined> => {
  try {
    const produtos = await ProdutoServices.getProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const selectProduto = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const produto = await ProdutoServices.selectProduto(id);
    if (!produto) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json(produto);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

const updateProduto = async (req: any, res: any): Promise<any> => {
  const id = parseInt(req.params.id);
  try {
    const resultado = await ProdutoServices.updateProduto(id, [req.body, req.profileId]);
    res.status(201).json(resultado);
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message })
      : res.status(500).json({ error: "Erro desconhecido" });
  }
};

module.exports = {
  insertProduto,
  getProdutos,
  selectProduto,
  updateProduto,
};
