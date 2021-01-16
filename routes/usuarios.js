const express = require('express');
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()
const { check } = require('express-validator')

router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email debe ser válido').isEmail(),
        check('password', 'El password debe tener más de 6 caracteres').isLength({min:6}),
    ],
    usuarioController.nuevoUsuario
);


module.exports = router;