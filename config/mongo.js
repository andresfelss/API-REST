const mongoose = require('mongoose'); // Requerumos mongoose

const dbConnect = () =>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err,res)=>{
        if(!err){
            console.log('******* SUCCESFULL CONEXION *********');
        }else{
            console.log('******* ERROR CONEXION *********');
        }
    });
}
 
module.exports = dbConnect; // la exportamos debido a que la vamos a utilizar en otros 

// DB_URI : mongodb+srv:4O47TvXh9yrJETrI//adminAndres:@cluster0.6vgom.mongodb.net/dbAPI?retryWrites=true&w=majority
