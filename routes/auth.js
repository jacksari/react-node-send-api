const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router()
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',
    [
        check('email','Agrega un email válido').isEmail(),
        check('password','El password no puede estar vacío').not().isEmpty()
    ],
    authController.autenticarUsuario
)

router.get('/',
    authMiddleware,
    authController.usuarioAutenticado
)


module.exports = router