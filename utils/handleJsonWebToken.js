const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
// Indicamos que queremos generar este token

// Token Sign in

/**
 * Debes pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user)=>{
    const sing = await jsonwebtoken.sign({
        _id: user._id,  
        role: user.role
    },JWT_SECRET,
    {
        expiresIn:"2h"
    });
    return sing
};

/**
 * Debes de pasar el token de sesion
 * @param {*} tokenJwt 
 * @returns 
 */

const verifyToken = async(tokenJwt) => {
    try {
        return jsonwebtoken.verify(tokenJwt,JWT_SECRET)
    } catch (error) {
        return null   
    }
}

module.exports = {tokenSign, verifyToken}