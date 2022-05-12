// recordar que el nombre del archivo es el nombre de la ruta
const express = require('express');
const router = express.Router();
//Importamos el middleware
const uploadMiddleware = require('../utils/handleStorage');

const {createItem, getItem, getItems, deleteItem} = require('../controllers/storage');
const { validatorCreateItem, validatorGetItem } = require('../validators/storage');

// para el envio de archivos se usa el metodo POST
router.post('/', uploadMiddleware.single("myFile"),createItem);

router.get('/',getItems);

router.get('/:id',validatorGetItem,getItem)

router.delete('/:id',validatorGetItem,deleteItem);



module.exports = router;
