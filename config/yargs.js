const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Nombre de la tarea'
}

const completado = {
    alias: 'c',
    default: true
}


const argv = require('yargs')
    .command('crear', 'Crea una tarea', {
        descripcion: descripcion //al llamarse igual no es necesario ponerlo así, se podría poner solo: descripcion
    })
    .command('listar', 'Muestra las tareas pendientes', {
        completado: {
            alias: 'c'
        }
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina la tarea introducida', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}