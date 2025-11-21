const yup = require("yup");

const schema = yup.object().shape({
    nome: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    telefone: yup.string().required("O telefone é obrigatório"),
    dataCadastro: yup.date() // opcional, pois o model gera automático
});

async function validarUsuario(req, res, next){
    try{
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch(error) {
        return res.status(400).json({ erros: error.errors });
    }
}

module.exports = { validarUsuario };
