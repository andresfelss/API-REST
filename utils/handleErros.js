// (res , mensaje , codigo de respuesta)
const handleHttpErrors = (res , message = 'Algo sucedio', code = 403) =>{
    res.status(code);  // me responda con un status code
    res.send({error: message}); // me muestre el error

};


module.exports = {handleHttpErrors}