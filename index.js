require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Search = require("./model/search");

const main = async() => {

    const busqueda = new Search;
    
    let opt;

    do {

        opt = await inquirerMenu();

        switch ( opt ) {
            
            
            case 1:
                // mostrar mensaje
                const city = await leerInput('Ciudad: ');

                // buscar ciudad
                const lugares = await busqueda.getCity( city );

                //Seleccionar ciudad
                const idSeleccionado = await listarLugares( lugares );
                if ( idSeleccionado === '0') continue;

                const lugarSel = lugares.find( l => l.id === idSeleccionado);

                //Guardar en DB
                busqueda.agregarHistorial( lugarSel.nombre );

                // Datos del Clima
                const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);
                // Mostrar resultados
                console.clear();

                console.log('\nInformacion de la ciudada\n'.green);
                console.log('Ciudad:', lugarSel.nombre );
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc.green)

                break;
        
            case 2:

                busqueda.historialCapitalizado.forEach( (lugar, i) => { 
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                })

                break;
        }

        if(opt !==0 ) await pausa();
        
    } while (opt !==0 );

}

main();