require("dotenv").config;
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;

//middleware que comprueba si estoy autorizado
function userAuthorized(req, res, next){
    try{
        //desestructuramos la autorización
        const {authorization} = req.headers;

        if(!authorization){
            res.redirect("http://localhost:3000/login");
        } else{
            //descodificamos el token
            const decoded = jwt.verify(authorization, SECRET);

            console.log(decoded);
        }
        next();
    }catch(error){
        next(error)
    }
}

module.exports = userAuthorized;
