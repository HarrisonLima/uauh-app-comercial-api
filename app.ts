import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/Auth");
const resetPasswordRoutes = require("./routes/User/User");

const equipamentoRoutes = require("./routes/Cadastro/Equipamento");
const perfilAcessoRoutes = require("./routes/Cadastro/PerfilAcesso");
const produtoRoutes = require("./routes/Cadastro/Produto");
const tarifaRoutes = require("./routes/Cadastro/Tarifa");
const statusRoutes = require("./routes/Cadastro/Status");
const usuarioRoutes = require("./routes/Cadastro/Usuario");

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

const credencialIdentificacaoRoutes = require("./routes/Credenciamento/Credencial/Identificacao");
const credencialLocalizacaoRoutes = require("./routes/Credenciamento/Credencial/Localizacao");
const credencialCondicaoComercialRoutes = require("./routes/Credenciamento/Credencial/CondicaoComercial");
const credencialFilialRoutes = require("./routes/Credenciamento/Credencial/Filial");
const credencialRepresentanteRoutes = require("./routes/Credenciamento/Credencial/Representante");
const credencialStatusRoutes = require("./routes/Credenciamento/Credencial/Status");
const credencialObservacaoRoutes = require("./routes/Credenciamento/Credencial/Justificativa");
const credencialJustificativaRoutes = require("./routes/Credenciamento/Credencial/Observacao");
const credencialRemanjecaoRoutes = require("./routes/Credenciamento/Credencial/Remanejacao");
const credencialRegistrosRoutes = require("./routes/Credenciamento/Credencial/Registros");
const credencialTecnologiaRoutes = require("./routes/Credenciamento/Credencial/Tecnologia");
const credencialDadosBancariosRoutes = require("./routes/Credenciamento/Credencial/DadosBancarios");

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
  credencialIdentificacaoRoutes,
  credencialLocalizacaoRoutes,
  credencialCondicaoComercialRoutes,
  credencialFilialRoutes,
  credencialRepresentanteRoutes,
  credencialStatusRoutes,
  credencialObservacaoRoutes,
  credencialJustificativaRoutes,
  credencialRemanjecaoRoutes,
  credencialRegistrosRoutes,
  credencialTecnologiaRoutes,
  credencialDadosBancariosRoutes,
  equipamentoRoutes,
  perfilAcessoRoutes,
  produtoRoutes,
  tarifaRoutes,
  resetPasswordRoutes,
  statusRoutes,
  usuarioRoutes
);

const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
