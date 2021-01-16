const multer = require('multer')
const shortId = require('shortid')
const fs = require('fs')

exports.subirArchivo = async(req,res,next) => {

    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req,file,cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                const name = file.originalname.split('.')[0]
                cb(null, `${name}-${shortId.generate()}${extension}`)
            }
        }) 
    }
    
    const upload = multer(configuracionMulter).single('archivo')
    
    upload( req, res, async (error) =>{
        //console.log(req.file);
        if(!error){
            res.json({
                archivo: req.file.filename
            })
        }else{
            res.json({
                error
            })
            return next()
        }
    })
}

exports.eliminarArchivo = async(req,res) => {
    console.log('Desde eliminar archuivo');
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
        console.log('archivo eliminado');       
    } catch (error) {
        console.log(error);
    }
}