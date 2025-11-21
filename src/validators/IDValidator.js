const mongoose = require('mongoose')

// Middleware que valida se o ID está no formato que o Mongo espera
function validarId(req, res, next) {
  const id = req.params.id
  const valido = mongoose.Types.ObjectId.isValid(id)
  if (!valido) {
    return res.status(400).json({ erro: "ID inválido!" })
  }
  next()
}

// exportar
module.exports = {
  validarId
}
