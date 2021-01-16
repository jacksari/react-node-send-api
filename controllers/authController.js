const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})
const { validationResult } = require('express-validator')

exports.autenticarUsuario = async(req, res, next) => {
    //Revisar si hay errores
    const  errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }

    //Buscar el usuario para ver si está registrado
    const { email,password } = req.body
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        return res.status(401).json({
            msg: "El usuario no existe"
        })
    }
    //Verificar password y autenticar
    if(bcrypt.compareSync(password, usuario.password)){
        //Crear Jwt
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        })
        res.json({
            token   
        })
    }else{
        return res.status(401).json({
            msg: "Password incorrecto"
        })
    }

}

exports.usuarioAutenticado = async(req,res,next) => {
    res.json({
        usuario: req.usuario
    })
}