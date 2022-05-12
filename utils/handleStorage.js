const multer = require('multer');
const storage = multer.diskStorage({
    // los argumentos son req file y callback
    destination: function (req,file, cb){  // Donde vamos a guardar estos archivos ?
        const pathStorage = `${__dirname}/../storage`; // ve a la carpeta sotorage

        cb(null, pathStorage);
    },
    filename: function (req,file,cb){
        // como generar un nombre aleatorio TODO tiene diferentes extensiones
        // obtenemos la extension
        const ext = file.originalname.split(".").pop() // te va a devolver ["name","png"] y pop agarra el ultimo valor
        const filename = `file${Date.now()}.${ext}`; // renombramos el archivo file-1231231.ext
        cb(null, filename);
    }
});
// cargamos el middleware
const uploadMiddleware = multer({storage:storage});

module.exports = uploadMiddleware