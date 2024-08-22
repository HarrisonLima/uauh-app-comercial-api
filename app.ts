import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/Auth");
const resetPasswordRoutes = require("./routes/User/User");

const perfilAcessoRoutes = require("./routes/cadastro/PerfilAcesso");
const produtoRoutes = require("./routes/cadastro/Produto");
const statusRoutes = require("./routes/cadastro/Status");
const usuarioRoutes = require("./routes/cadastro/Usuario");

const clienteIdentificacaoRoutes = require("./routes/Credenciamento/Cliente/Identificacao");
const clienteLocalizacaoRoutes = require("./routes/Credenciamento/Cliente/Localizacao");
const clienteCondicaoComercialRoutes = require("./routes/Credenciamento/Cliente/CondicaoComercial");
const clienteFilialRoutes = require("./routes/Credenciamento/Cliente/Filial");
const clienteRepresentanteRoutes = require("./routes/Credenciamento/Cliente/Representante");
const clienteStatusRoutes = require("./routes/Credenciamento/Cliente/Status");
const clienteObservacaoRoutes = require("./routes/Credenciamento/Cliente/Justificativa");
const clienteJustificativaRoutes = require("./routes/Credenciamento/Cliente/Observacao");
const clienteRemanjecaoRoutes = require("./routes/Credenciamento/Cliente/Remanejacao");
const clienteRegistrosRoutes = require("./routes/Credenciamento/Cliente/Registros");

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(
  "/api",
  authRoutes,
  clienteIdentificacaoRoutes,
  clienteLocalizacaoRoutes,
  clienteCondicaoComercialRoutes,
  clienteFilialRoutes,
  clienteRepresentanteRoutes,
  clienteStatusRoutes,
  clienteJustificativaRoutes,
  clienteObservacaoRoutes,
  clienteRemanjecaoRoutes,
  clienteRegistrosRoutes,
  perfilAcessoRoutes,
  produtoRoutes,  
  resetPasswordRoutes,
  statusRoutes,
  usuarioRoutes
);

const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
