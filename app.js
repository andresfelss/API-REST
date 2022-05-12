// Configuracion de la libreria que nos permite usar variables de entorno

require('dotenv').config();  // solo con esta linea de codigo podemos usar las variables de entorno

//----------------------------------------------------------------------
const port = process.env.PORT || 3000;  // Definimos la variable de entorno para que use dicha variable

// Requerimos nuestra configuracion de la base de datos
const dbConnect = require('./config/mongo');
// ----------------------------------------------------

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// Tenemos que poner esto para que nuestra app pueda recivir algo
app.use(express.json());

// Para que mi app pueda usar datos publico o recursos estaticos
app.use(express.static('storage'));

// Para cargar de manera dinamica las rutas
app.use("/api", require('./routes'));



app.listen(port,() =>{
    console.log(`Tu app esta lista para escuchar por : http://localhost:${port}`);
});

// Invocamos la conexion a la base de datos
dbConnect();
//-----------------------------------------