const axios = require('axios');

const token = process.env.MAPBOX_KEY;

class Search { 

    historial = ['Madrid','San jose','Bogota'];


    constructor(){
        // TODO = Leer DB
    }

    get paramsMapbox(){ 

        return { 

            'access_token': token,
            'limit':5,
            'lenguage': 'es'
        }

    }

    async getCity( city = '' ){ 

        try {

            const instance = axios.create({ 
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            console.log(resp.data);


            return []; // retornar lugares

        } catch (error) {

            return [];
        }
        // Peticion HTTP


    }

}

module.exports = Search;