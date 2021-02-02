const fs = require("fs").promises;
const bcrypt = require("bcrypt");

async function register(req, res, next) {
    try {
        //desestructuramos datos del body
        const { name, email, password } = req.body;

        //faltan datos
        if (!name || !email | !password) {
            throw new Error("faltan datos");
        }

        //obtenemos usuarios de .json
        const users = require("../users.json");

        //revisamos que no haya ningún usuario existente
        if (users.find((user) => user.email === email)) {
            throw new Error("el usuario ya existe");
        }
        //codificamos la contraseña con librería bcrypt
        const passwordCrypted = await bcrypt.hash(password, 10);

        //guardamos usuario en variable user
        users.push({ name, email, password: passwordCrypted });

        //introducimos el usuario en el .json
        await fs.writeFile("./users.json", JSON.stringify(users));


        res.send(users);
    } catch (error) {
        next(error);
    }
}

module.exports = register;