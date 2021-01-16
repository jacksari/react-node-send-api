const express = require('express');
const archivosController = require('../controllers/archivosController')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',
    authMiddleware,
    archivosController.subirArchivo
)

module.exports = router