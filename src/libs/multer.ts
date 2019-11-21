//configuracion de las imagenes
//encargado de subir las imagenes
import multer from 'multer'
import path from 'path'
import uuid from 'uuid/v4';

// Settings
//cambiar de nombre al nombre de la carpeta
const storage = multer.diskStorage({
    //idicar en que carpeta se guardara los archivos
    destination: 'uploads',
    filename: (req, file, cb) => {
        //renobrar el nombre de las imagenes
        //uuid: genera un id
        //path.extname(file.originalname) conservar la extension
        cb(null, uuid() + path.extname(file.originalname))
    }
});
export default multer({storage});