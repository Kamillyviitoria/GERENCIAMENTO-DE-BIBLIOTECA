const yup = require("yup");

const schema = yup.object().shape({
    nota: yup.number().required(),
    comentario: yup.string().required(),
    usuario: yup.string().required(),
    livro: yup.string().required(),
    dataAvaliacao: yup.date()
});

async function validarAvaliacao(req, res, next){
    try{
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch(error) {
        return res.status(400).json({ erros: error.errors });
    }
}

module.exports = { validarAvaliacao };
