let url = "http://anapioficeandfire.com/api/";
const axios = require("axios");


async function getData(url) {
    try {
        const data = (await axios(url)).data;
        return data;
    } catch (error) {
        next(error);
    }
}

async function got(req, res, next) {
    try {
        const data = await getData(url);
        res.send(data);
    } catch (error) {
        next(error);
    }
}

module.exports = { getData, got };