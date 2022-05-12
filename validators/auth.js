const {check} = require('express-validator');
const {validateResult} = require('../utils/handleValidator');



const validatorRegister= [
    check('name').exists().notEmpty().isLength({min:3,max:99}),
    check('age').exists().notEmpty().isNumeric({min:2,max:100}),
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({min:4,max:11}), 
    // Funcion de respuesta
    (req,res,next) => validateResult(req,res,next),
];

const validatorLogin = [
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({min:4,max:11}), 
    (req,res,next) => validateResult(req,res,next),
]


module.exports = { validatorRegister, validatorLogin }