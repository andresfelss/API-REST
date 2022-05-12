const {check} = require('express-validator');
//.isLength({min:5, max:90})
const {validateResult} = require('../utils/handleValidator');

const validatorCreateItem = [
    check('name').exists().notEmpty(),
    check('album').exists().notEmpty(),
    check('cover').exists().notEmpty(),
    check('artist').exists().notEmpty(),
    check('artist.name').exists().notEmpty(),
    check('artist.nickname').exists().notEmpty(),
    check('artist.nationality').exists().notEmpty(),
    check('duration').exists().notEmpty(),
    check('duration.start').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),
    check('mediaId').exists().notEmpty().isMongoId(),

    // Funcion de respuesta
    (req,res,next) => validateResult(req,res,next),


];

const validatorGetItem = [
    check('id').exists().notEmpty().isMongoId(),
    // Funcion de respuesta
    (req,res,next) => validateResult(req,res,next),
];
module.exports = { validatorCreateItem , validatorGetItem };