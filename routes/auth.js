const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const { validatorRegister, validatorLogin } = require('../validators/auth');
const router = express.Router();

/**
 * Crea un Registro
 */

// quiero dos rutas http://localhost/api/auth/loggin y el register

router.post('/register', validatorRegister, registerCtrl)
router.post('/login', validatorLogin, loginCtrl)


module.exports = router;