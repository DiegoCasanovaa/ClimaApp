require('dotenv').config();

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
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
                await busqueda.getCity( city );
                //Seleccionar ciudad
                // Datos del Clima
                // Mostrar resultados
                console.log('\nInformacion de la ciudada\n'.green);
                console.log('Ciudad:', );
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperatura:',);
                console.log('Minima:',);
                console.log('Maxima:',);

                break;
        
            default:
                break;
        }

        if(opt !==0 ) await pausa();
        
    } while (opt !==0 );


}

main();