const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')
//Creando servidor
const app = express();

//Conectar DB
conectarDB()

//puerto de app
const port = process.env.PORT || 4000;

//Habilitar leer valores de body
app.use(express.json())
//CORS
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opcionesCors))

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))

//Arrancar app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor está funcionando en el puerto ${port}`);
})