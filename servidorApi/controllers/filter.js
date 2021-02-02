let url = "http://anapioficeandfire.com/api/";
const axios = require("axios");

async function filter(req, res, next) {
    try {
        //desestructuramos categoría
        const { category } = req.params;

        //construimos url
        url = url + category;

        //obtenemos filtro de la búsqueda
        const query = req.query;

        //hacemos búsqueda por categoría
        let data = (await axios (url)).data;
        
        if(Object.keys(query)){
            console.log("llega");
            for(const key in query){
                data = data.filter((entry) => entry[key] === query[key]);
            }
        }

        console.log(data);
        url = "http://anapioficeandfire.com/api/";

        //emitimos respuesta
        res.send(data);

    } catch (error) {
        next(error)
    }
}
module.exports = filter;