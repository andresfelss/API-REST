
const {check} = require('express-validator');

const {validateResult} = require('../utils/handleValidator');

const validatorCreateItem = [
    check('url').exists().notEmpty(),
    check('filename').exists().notEmpty(),

    // funcion de respuesta
    (req,res,next) => validateResult(req,res,next),
]

const validatorGetItem = [
    check('id').exists().notEmpty().isMongoId(),
    // Funcion de respuesta
    (req, res, next) => validateResult(req, res, next),
]



module.exports = {validatorCreateItem ,validatorGetItem}