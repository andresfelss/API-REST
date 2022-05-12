const customHeader = (req, res, next)=>{
    try{
        const apiKey = req.headers.api_key;
        if(apiKey == 'andres-01'){
            next()
        }else{
            res.status(403);
            res.send({error: 'Api_Key incorrecta'});
        }
    }catch(e){
        res.status(403);
        res.send({error: 'ALGO OCURRIO EN EL CUSTOMHEADER'});
    }

}

module.exports = customHeader;