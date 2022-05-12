// Este archivo tendra dos funciones 
// -Encriptar la contraseña
// - Comparar las contraseñas encriptadas

//-----------------------------------------------------
const bcryptjs = require('bcryptjs');

 /**
  * Contraseña sin ENCRIPTAR
  * @param {*} passwordPlane 
  */

const encrypt = async(passwordPlane) =>{           // El salt es la aletoriedad se recomienda poner 10
    const hash = await bcryptjs.hash(passwordPlane,10)   // Un hash es una version encriptada de nuestra contraseña
    return hash;
};

// Compara la version encriptada del password con la version plana
/**
 * Pasar contraseña sn encriptar y la contraseña encriptada
 * @param {*} passwordPlane 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlane, hashPassword) => {
    return await bcryptjs.compare(passwordPlane,hashPassword);
};

module.exports = { encrypt, compare }