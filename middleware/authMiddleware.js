const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization')
    if(authHeader){
        //Obtener el token
        const token = authHeader.split(' ')[1]
        //Comprobar el jwt
        try {    
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log('Desde middleware');
            req.usuario = usuario   
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'jwt no válido'
            })
        }
    }
    return next()
}