const express = require('express')
// const cors = require('cors')
const app = express()

// app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://walisson_rocha:HVFLodR1odvGEVlK@clusterbiblioteca.zvs9kdq.mongodb.net/?appName=ClusterBiblioteca`;



// Importar controladores
const AgendamentoController = require('./controllers/AgendamentoController')
const CategoriaController = require('./controllers/CategoriaController')
const EmprestimoController = require('./controllers/EmprestimoController')
const FuncionarioController = require('./controllers/FuncionarioController')
const LivroController = require('./controllers/LivroController')
const UsuarioController = require('./controllers/UsuarioController')
const AvaliacaoController = require('./controllers/AvaliacaoController')   // mover pra cá


// Usar as rotas
// Usar as rotas
app.use('/agendamentos', AgendamentoController)
app.use('/categorias', CategoriaController.router)  // só se CategoriaController exporta { router, ... }
app.use('/emprestimos', EmprestimoController)
app.use('/funcionarios', FuncionarioController)
app.use('/livros', LivroController.router)          // só se LivroController exporta { router, ... }
app.use('/usuarios', UsuarioController)            // exporta router direto
app.use('/avaliacao', AvaliacaoController)


mongoose.connect(url)
    .then(() => {
        console.log('Conectado ao banco MongoDB!!')
    })
    .catch(err => {
        console.log("Erro ao conectar ao banco MongoDB: ", err)
    })

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})
