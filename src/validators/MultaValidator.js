const yup = require("yup");
const mongoose = require("mongoose");

const schema = yup.object().shape({
    valor: yup.number().required(),
    motivo: yup.string().required().min(10).max(50),
    descricao: yup.string().required().min(10).max(100),
    dataOcorrencia: yup.date().required(),
    dataPagamento: yup.date().required(),
    status: yup.string().required(),
    funcionario: yup
        .string()
        .required()
        .test("id-validator", "id do funcionário é inválido", (value) =>
            mongoose.Types.ObjectId.isValid(value)
        ),
});

async function validarMulta(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ erros: error.errors });
    }
}

module.exports = { validarMulta };
