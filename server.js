const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Log de requisições
app.use((req, res, next) => {
  console.log("-------### LOG da Requisição ###-------")
  console.log("TIME: ", new Date().toLocaleString())
  console.log("METODO: ", req.method)
  console.log("ROTA: ", req.url)
  next()
})

// Importando controladores
const { router: LivroController } = require('./routes/LivroController')
const { router: FuncionarioController } = require('./routes/FuncionarioController')
const AgendamentoController = require('./routes/AgendamentoController')
const {router: UsuarioController} = require('./routes/UsuarioController')

// Prefixos diferentes
app.use("/", LivroController)
app.use("/", FuncionarioController)
app.use("/", AgendamentoController)
app.use("/", UsuarioController )

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})
