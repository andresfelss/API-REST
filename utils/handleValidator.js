
const { validationResult } = require('express-validator');

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw(); // Valida las cosas
        return next(); // Continua hacia el controlador
    }catch(err){
        res.status(403); // tipo de error
        res.send({ errors: err.array( ) }); // envio un array con los errores
    }
}

module.exports = {validateResult}