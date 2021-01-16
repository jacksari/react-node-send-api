const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.nuevoUsuario = async (req, res) =>{

    //Mostrar mensajes de error de express-validator
    const  errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }

    //verificar si el usuario ya estuvo registrado
    const { email, password, nombre } = req.body
    let usuario = await Usuario.findOne({ email })
    if(usuario){
        return res.status(400).json({
            msg: "El usuario ya está registrado"    
        })
    }
    
    //Crear nuevo usuario
    usuario = new Usuario(req.body)
    //Hash del password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt);

    try {    
        await usuario.save()
        res.json({
            msg: 'Usuario creado',
            usuario: nombre
        })        
    } catch (error) {
        console.log('Error', error);
    }

}