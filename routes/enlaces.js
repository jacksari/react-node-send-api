const express = require('express');
const enlacesController = require('../controllers/enlacesController')
const archivosController = require('../controllers/archivosController')
const router = express.Router()
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',
    [
        check('nombre','Sube un archivo').not().isEmpty(),
        check('nombre_original','Sube un archivo').not().isEmpty(),
    ],
    authMiddleware,
    enlacesController.nuevoEnlace
)

router.get('/:url',
    enlacesController.obtenerEnlace,
    archivosController.eliminarArchivo
)

module.exports = router