const Enlaces = require('../models/enlaceModel')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.nuevoEnlace = async (req,res,next) => {
    //Revisar si hay errores
    const  errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }
    //Almacenar en la DB
    const { nombre_original } = req.body
    const enlace = new Enlaces()
    enlace.url = shortid.generate()
    enlace.nombre = shortid.generate()
    enlace.nombre_original = nombre_original

    //Si el usuario está autenticado
    if(req.usuario){
        const { password, descargas } = req.body
        //Asignar a enlace numero de descargas
        descargas ? enlace.descargas = descargas : null
        //Asignar password
        const salt = await bcrypt.genSalt(10)
        password ? enlace.password = await bcrypt.hash(password, salt) : null
        //Asignar autor
        enlace.autor = req.usuario.id
    }   
    
    try {
        await enlace.save()
        return res.json({
            msg: `${enlace.url}`
        })
    } catch (error) {
        return res.json({
            error: 'Error al guardar enlace',
            message: error
        })
    }

}

//Obtener enlace
exports.obtenerEnlace = async(req,res,next) => {
    //Verificar si existe el enlace
    const enlace = await Enlaces.findOne({url: req.params.url})
    if(!enlace){
        return res.status(400).json({
            msg: 'Ese enlace no existe'
        })
    }
    //console.log(enlace);
    //Si el enlace existe
    res.json({
        archivo: enlace.nombre
    })
    //Si las descargas son iguales a 1 - Borrar entrada
    if(enlace.descargas === 1){
        //Eliminar el archivo
        req.archivo = enlace.nombre_original
        //Eliminar enlace
        await Enlaces.findOneAndRemove(req.params.url)
        next()
    }else{
        enlace.descargas--
        await enlace.save()
    }
    //Si las descargas son mayores a 1 - restar 1
}