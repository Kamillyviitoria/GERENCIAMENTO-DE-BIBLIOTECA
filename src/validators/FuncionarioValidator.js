const yup = require("yup");
const mongoose = require("mongoose");

const schema = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().email().required(),
    telefone: yup.string().required(),
    dataNascimento: yup.date().required(),
    dataContratacao: yup.date().required(),
    genero: yup.string().required(),
    
});

async function validarFuncionario(req, res, next){
    try{
        await schema.validate(req.body, {abortEarly: false})
        next()
    }catch(error){
        return res.status(400).json({erros: error.errors})
    }
}

module.exports = {validarFuncionario}