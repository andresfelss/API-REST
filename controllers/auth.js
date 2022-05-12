const {matchedData} = require('express-validator');
const {usersModel} = require('../models');
const { handleHttpErrors } = require('../utils/handleErros');
const {tokenSign} = require('../utils/handleJsonWebToken');
const { encrypt, compare } = require('../utils/handlePassword');


/**
 * Este controlador es el encargado de registrar un usuario y generar el jtoken
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req,res) =>{
    try {
        req = matchedData(req);  // que la data sea acorde
        
        const passwordHashed = await encrypt(req.password);
        
        const body = {... req, password: passwordHashed }; // esto lo que hace es crear 
        //un nuevo objeto con la info de req pero sobreescribiendo el password si es que existe si no existe lo concatena
        
        const dataUser = await usersModel.create(body); // Creo el registro del ussuario en la base de datos
        
        // Creo un objeto que lo llamo data que contiene el token generado
        const data = {
            token:await tokenSign(dataUser),
            user: dataUser,
        }
        res.send({data});
        
    } catch (error) {
        handleHttpErrors(res,'Error desde control de registro');
    }
};

/**
 * Controlador encargado de loggear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async(req,res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email: req.email}); // Buscamos el usuario
        if(!user){
            handleHttpErrors(res,'USER DONT EXIST',404); // si el usuario no existe cagaste
            return
        }
        const hashPassword = user.get('password'); // obtengo la contraseña encriptada que estae en la bd
        const check = await compare(req.password, hashPassword); // Comparo las contraseñas a ver si son iguales
        if(!check){
            handleHttpErrors(res, 'PASSWORD_INVALID', 401) // si no son iguales cagaste
            return
        }

        const data  = {
            token: await tokenSign(user), // El token de sesion para ESTE usuario recordar poner el await
            user: {user} // devuelvo el usuario 
        }
        res.send({data}); 

    } catch (error) {
        handleHttpErrors(res, 'Error desde login control')
    }
};

module.exports = {loginCtrl, registerCtrl};