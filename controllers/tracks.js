const { matchedData, body } = require('express-validator');
const {tracksModel} = require('../models'); // importamos el modelo tracks para los contorlles de tracks

// Importamos el manejador de errores
const { handleHttpErrors } = require('../utils/handleErros');

/**
 * Obtener una Lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) =>{  // definimos las funciones

    try {
        const userMail = req.user.email;
        const data = await tracksModel.find({}); // Me busco TODO lo que esta en ese modelo
        res.send({data,userMail});    
    } catch (e) {
        handleHttpErrors(res,'Error_en_GET_ITEMS',403);
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req,res) =>{
    try {
        req = matchedData(req); // para filtrar y que solo me devuelva el id 
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({ data });
    } catch (e) {
        handleHttpErrors(res,'Error en get Item')
    }

};

/**
 * Crear o Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req,res) =>{

    try {
        // validator me da una funcion la cual no deja entrar data basura en mis requests 
        // en esa variable solo estara la data que cumpla con las validaciones hechas en validators asi:
        const body = matchedData(req)
        
        console.log(body);
        const data = await tracksModel.create(body)
        res.send({data});
    } catch (error) {
        handleHttpErrors(res,'Error al CrearItem', 500);         
    }


};

/**
 * Actualizar un Registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async(req,res) =>{
    try {
        // validator me da una funcion la cual no deja entrar data basura en mis requests 
        // en esa variable solo estara la data que cumpla con las validaciones hechas en validators asi:
       const {id, ...body } = matchedData(req); // esto lo que hace es devolverme id como variable sola
       // el body tambien contendria esa id pero con los  ...body la extraemos
        // de un objeto creamos dos objetos

        console.log(body);
        const data = await tracksModel.findByIdAndUpdate(id,body);
        res.send({data});
    } catch (error) {
        handleHttpErrors(res,'Error al UpdateItem', 500);         
    }

};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async(req,res) => {
    try {
        req = matchedData(req); // para filtrar y que solo me devuelva el id 
        const {id} = req;
        const data = await tracksModel.delete({_id: id});
        res.send({ data });
    } catch (e) {
        handleHttpErrors(res,'Error en Delete Item');
    }

};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem};