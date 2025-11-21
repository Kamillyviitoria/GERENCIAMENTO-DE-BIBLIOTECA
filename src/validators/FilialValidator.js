const yup = require("yup");
const mongoose = require("mongoose");

const schema = yup.object().shape({
    nome: yup.string().required(),
    cnpj: yup.number().required(),
    telefone: yup.number().required(),
    email: yup.string().email().required(),
    gerente: yup.string().required().test("id-validator", "id do gerente é inválido", (value) => mongoose.Types.ObjectId.isValid(value))
    ,
    status: yup.string().required()
    
});

async function validarFilial(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ erros: error.errors });
    }
}

module.exports = { validarFilial };
