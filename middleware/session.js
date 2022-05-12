const { usersModel } = require("../models");
const { handleHttpErrors } = require("../utils/handleErros");
const { verifyToken } = require("../utils/handleJsonWebToken");

const authMiddleware = async (req,res,next)=>{
    try {
        // Necesitamos capturar el token , se usan para pasar un metodo de autenticacion en el header
        if(!req.headers.authorization){ // si no existe la propiedad de authorization en el header entonces cagaste
            handleHttpErrors(res,'No Token');
            return
        }
        // Para recuperar el token del header
        const token  = req.headers.authorization.split(' ').pop(); // agarra solo el token y omite la palabra bearer
        const dataToken = await verifyToken(token);

        //Nos aseguramos que existe un id
        if(!dataToken._id){
            handleHttpErrors(res, 'Error_ID_token');
            return
        }

        // Si queremos saber quien es el usuario que esta consumiendo este token
        const user = await usersModel.findById(dataToken._id);
        req.user = user; // inyecto el usuario en la peticion req para poder saber en el controlador quien es



        next() // si pasa entonces que deje pasar esta persona

    } catch (error) {
        handleHttpErrors(res, 'Error en el middleaware de sesiones',401);
    }
}



module.exports = {authMiddleware}