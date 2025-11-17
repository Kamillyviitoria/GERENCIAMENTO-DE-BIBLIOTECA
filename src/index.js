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

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`



mongoose.connect(url)
    .then(() => {
        console.log('Conectado ao banco MongoDB!!')
    })
    .catch(err => {
        console.log("Erro ao conectar ao banco MongoDB: ",err)
    })

// rotas

const FuncionarioController = require('./controllers/FuncionarioController')
app.use(FuncionarioController)


// Prefixos diferentes

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})
