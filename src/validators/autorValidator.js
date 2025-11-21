// /c:/Users/walis/OneDrive/Documentos/projeto final/GERENCIAMENTO-DE-BIBLIOTECA/src/validators/autorValidator.js

/**
 * Middlewares de validação para rotas de Autor.
 * Uso: const { validateCreateAuthor, validateUpdateAuthor, validateIdParam } = require('./autorValidator');
 *
 * Não depende de bibliotecas externas — apenas validação básica e mensagens em português.
 */

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function isStringLengthInRange(value, min = 1, max = Infinity) {
    if (typeof value !== 'string') return false;
    const len = value.trim().length;
    return len >= min && len <= max;
}

function isValidDateISO(value) {
    if (typeof value !== 'string') return false;
    const d = new Date(value);
    return !Number.isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value);
}

function isPastDate(value) {
    const d = new Date(value);
    return d.getTime() < Date.now();
}

function isValidObjectIdOrInt(id) {
    if (!isNonEmptyString(id)) return false;
    // 24 hex chars (MongoDB ObjectId)
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;
    // simple integer id
    const intRegex = /^[1-9]\d*$/;
    return objectIdRegex.test(id) || intRegex.test(id);
}

function formatErrors(errors) {
    return errors.map((e) => ({ field: e.field || null, message: e.message }));
}

function validateCreateAuthor(req, res, next) {
    const errors = [];
    const { nome, sobrenome, nacionalidade, dataNascimento, biografia } = req.body || {};

    // nome: obrigatório, 2-100 chars
    if (!isNonEmptyString(nome)) {
        errors.push({ field: 'nome', message: 'Nome é obrigatório.' });
    } else if (!isStringLengthInRange(nome, 2, 100)) {
        errors.push({ field: 'nome', message: 'Nome precisa ter entre 2 e 100 caracteres.' });
    }

    // sobrenome: opcional, se informado 2-100 chars
    if (sobrenome !== undefined && sobrenome !== null) {
        if (!isStringLengthInRange(String(sobrenome), 2, 100)) {
            errors.push({ field: 'sobrenome', message: 'Sobrenome, se informado, precisa ter entre 2 e 100 caracteres.' });
        }
    }

    // nacionalidade: opcional, se informado 2-56 chars
    if (nacionalidade !== undefined && nacionalidade !== null) {
        if (!isStringLengthInRange(String(nacionalidade), 2, 56)) {
            errors.push({ field: 'nacionalidade', message: 'Nacionalidade, se informada, precisa ter entre 2 e 56 caracteres.' });
        }
    }

    // dataNascimento: opcional, se informado deve ser ISO date e no passado
    if (dataNascimento !== undefined && dataNascimento !== null && String(dataNascimento).trim() !== '') {
        if (!isValidDateISO(String(dataNascimento))) {
            errors.push({ field: 'dataNascimento', message: 'Data de nascimento deve ser uma data no formato YYYY-MM-DD.' });
        } else if (!isPastDate(String(dataNascimento))) {
            errors.push({ field: 'dataNascimento', message: 'Data de nascimento deve ser no passado.' });
        }
    }

    // biografia: opcional, até 1000 chars
    if (biografia !== undefined && biografia !== null) {
        if (!isStringLengthInRange(String(biografia), 0, 1000)) {
            errors.push({ field: 'biografia', message: 'Biografia pode ter no máximo 1000 caracteres.' });
        }
    }

    if (errors.length) {
        return res.status(400).json({ errors: formatErrors(errors) });
    }
    return next();
}

function validateUpdateAuthor(req, res, next) {
    // Para update aceitamos campos parciais. Reaproveitamos regras de create, mas sem obrigatoriedade do nome.
    const errors = [];
    const { nome, sobrenome, nacionalidade, dataNascimento, biografia } = req.body || {};

    if (nome !== undefined) {
        if (!isNonEmptyString(nome)) {
            errors.push({ field: 'nome', message: 'Nome não pode ser vazio quando informado.' });
        } else if (!isStringLengthInRange(nome, 2, 100)) {
            errors.push({ field: 'nome', message: 'Nome precisa ter entre 2 e 100 caracteres.' });
        }
    }

    if (sobrenome !== undefined) {
        if (!isStringLengthInRange(String(sobrenome), 2, 100)) {
            errors.push({ field: 'sobrenome', message: 'Sobrenome, se informado, precisa ter entre 2 e 100 caracteres.' });
        }
    }

    if (nacionalidade !== undefined) {
        if (!isStringLengthInRange(String(nacionalidade), 2, 56)) {
            errors.push({ field: 'nacionalidade', message: 'Nacionalidade, se informada, precisa ter entre 2 e 56 caracteres.' });
        }
    }

    if (dataNascimento !== undefined && String(dataNascimento).trim() !== '') {
        if (!isValidDateISO(String(dataNascimento))) {
            errors.push({ field: 'dataNascimento', message: 'Data de nascimento deve ser uma data no formato YYYY-MM-DD.' });
        } else if (!isPastDate(String(dataNascimento))) {
            errors.push({ field: 'dataNascimento', message: 'Data de nascimento deve ser no passado.' });
        }
    }

    if (biografia !== undefined) {
        if (!isStringLengthInRange(String(biografia), 0, 1000)) {
            errors.push({ field: 'biografia', message: 'Biografia pode ter no máximo 1000 caracteres.' });
        }
    }

    if (errors.length) {
        return res.status(400).json({ errors: formatErrors(errors) });
    }
    return next();
}

function validateIdParam(req, res, next) {
    const id = req.params && (req.params.id || req.params._id);
    if (!isValidObjectIdOrInt(id)) {
        return res.status(400).json({ errors: [{ field: 'id', message: 'ID inválido.' }] });
    }
    return next();
}

module.exports = {
    validateCreateAuthor,
    validateUpdateAuthor,
    validateIdParam,
};