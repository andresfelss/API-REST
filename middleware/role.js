const { handleHttpErrors } = require("../utils/handleErros");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRole = (roles) => (req, res, next) =>{
    try {
        const {user} = req;
        console.log(user)
        const rolesByUser = user.role; // Todos los ["user"]

        // verificamos que algunos de estos roles que tiene el usuarui cumpla con el rol que se define para el metodo
        const checkValueRole =  roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // nos devuelve tru o false
        // alguna de las verificaciones existe devulev true si no existe devuelve false
        if (!checkValueRole){
            handleHttpErrors(res, `El usuario con email: ${user.email} No tiene permisos de ${roles}`);
            return
        }
        // si si tiene permisos que siga
        next();
    } catch (error) {
        handleHttpErrors(res,'Error con los permisos ( middleware role )');
        return
    }

};

module.exports = {checkRole}