require("dotenv").config();
const bcrypt = require("bcrypt")
const { SECREET} = process.env;
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    try{
        //desestructuramos el body
        const {email, password} = req.body;

        //obtenemos datos del json
        const users = require("../users.json");

        //encontramos usuario y password
        const user = users.find((u) => u.email === email);

        //si no existe usuario en el json, error
        if(!user) {
            throw new Error("Usuario no existe");
        }
        //comprobamos las contraseñas
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("contraseña no coincide")
        }

       //generar el token
       const token = jwt.sign(user.email, SECRET);
       console.log(token);


        res.send("estás logueado");  
    } catch (error) {
        next(error);

    }
}

module.exports = login;