const { matchedData } = require('express-validator');
const {storageModel} = require('../models'); // importamos el modelo tracks para los contorlles de tracks
const { handleHttpErrors } = require('../utils/handleErros');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`
/**
 * Obtener una Lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) =>{  // definimos las funciones

    try {
        const data = await storageModel.find({}); // Me busco TODO lo que esta en ese modelo
        res.send({data});
        
    } catch (error) {
        handleHttpErrors(res,'Error desde getItems Storage');
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req,res) =>{
    try {
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data})
    } catch (error) {
        handleHttpErrors(res,'Error desde getItem Storage');
    }
};

/**
 * Crear o Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) =>{
    try {
        const {body, file} = req
        console.log(body);
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send(data);    
    } catch (error) {
        handleHttpErrors(res, 'Error desde createItem Storage')
    }
};



/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req,res) => {
    try {
        const {id} = matchedData(req);
        const objeto = await storageModel.findById({_id:id});
        await storageModel.deleteOne({_id: id}); // Lo eliminamos de la base de datos
        const filePath =`${MEDIA_PATH}/${objeto.filename}`; // ruta absoluta de mi archivo
        fs.unlinkSync(filePath) // elimino mi archivo   
        const data  = {
            filePath,
            deleted:1
        }
        res.send({data});
    } catch (error) {
        handleHttpErrors(res, 'Error desde deleteItem Storage')
    }
};





module.exports = {getItems, getItem, createItem, deleteItem};