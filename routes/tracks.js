const express = require('express');
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem} = require('../controllers/tracks');
const { checkRole } = require('../middleware/role');
const { authMiddleware } = require('../middleware/session');

// Todo GET,POST,DELETE,PUT
const {validatorCreateItem ,validatorGetItem} = require('../validators/tracks');


/** 
 *  Lista los items
 */
router.get("/",authMiddleware, getItems);

/**
 * Obtengo un solo item o detalle   
 */

router.get("/:id",validatorGetItem,getItem)


/** 
 * Crear un Item
 */
// el checkrole tiene que estar despues del authmiddleware debido a que el necesita que exista un usuarios asociado
router.post('/',validatorCreateItem,authMiddleware,checkRole(['admin']),createItem);


/**
 * Update item
 */

router.put("/:id", validatorCreateItem,validatorGetItem, updateItem )


/**
 * Delete Item
 */
router.delete('/:id', validatorGetItem, deleteItem);


module.exports = router;