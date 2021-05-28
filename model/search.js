const axios = require('axios');
const fs = require('fs');

const token = process.env.MAPBOX_KEY;
const openWeatherToken = process.env.OPENWEATHER_KEY;

class Search { 

    historial = [];
    dbPath = './db/database.json';


    constructor(){
        
        this.leerDB();
    }

    get paramsMapbox(){ 

        return { 

            'access_token': token,
            'limit':5,
            'lenguage': 'es'
        }

    }

    get historialCapitalizado(){

        return this.historial.map( lugar => { 

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );            

            return palabras.join(' ')
        })

    }

    async getCity( city = '' ){ 

        try {

            const instance = axios.create({ 
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({

                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            }));

        } catch (error) {

            return [];
        }
        // Peticion HTTP


    }

    async climaLugar( lat, lon ){ 

        try {

            // instancia  axios 
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat ,
                    lon ,
                    appid: openWeatherToken, 
                    units: 'metric',
                    lang: 'es'
                }
            })
            // resp
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return{ 

                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp

            }


            
        } catch (error) {

            console.log(error);
            
        }

    }

    agregarHistorial( lugar = ''){ 

        if( this.historial.includes( lugar.toLocaleLowerCase() )){
            return;
        }

        this.historial = this.historial.splice(0,5);
        
        // TODO: Preevenir duplicados
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if( !fs.existsSync( this.dbPath) ) return;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8'});

        const data = JSON.parse( info );

        this.historial = data.historial;

        
    }

}

module.exports = Search;