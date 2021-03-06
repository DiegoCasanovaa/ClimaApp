const inquire = require('inquirer');

require('colors');

const menuOpt = [ 
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green}  Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green}  Historial`
            },
            {
                value: 0,
                name: `${'3.'.green}  salir`
            }
        ]
    }
]

const inquirerMenu = async() => { 

    console.clear();
    console.log(' ======================= '.green)
    console.log(' Seleccione una opcion '.white)
    console.log(' ======================= \n'.green)

    const { option } = await inquire.prompt(menuOpt)

    return option
}

const question = [
    {
        type: 'input',
        name: 'choice',
        message: `Presione ${'ENTER'.green} para continuar \n`

    }
]

const pausa = async() => { 

    console.log('\n')
    await inquire.prompt(question)

}

const leerInput = async( mensaje ) => { 

    const question = [{
        type: 'input',
        name: 'desc',
        message: mensaje,
        validate( value ){
            if( value.length === 0){
                return ' Por favor ingrese un valor'
            }
            return true;
        }
    }]

    
    const { desc } = await inquire.prompt(question);
    return desc;

}

const listarLugares = async( lugares = []) => { 

    const choices = lugares.map( (lugar, idx )=> { 

        const index = `${idx + 1}.`.green;
        
        return { 
            value: lugar.id,
            name: `${ index } ${lugar.nombre}`
        }
    });

    choices.unshift({
        value:'0',
        name: '0'.green + ' Cancelar'
    });

    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ]
    const { id } = await inquire.prompt(preguntas);

    return id;

    // {
    //     value: tarea.id,
    //     name: `${'1.'.green}  Crear tarea`
    // },


}

const confirmar = async(message) =>{ 

    const question = [ 
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquire.prompt(question);

    return ok

}



module.exports = { inquirerMenu, pausa, leerInput, listarLugares, confirmar};