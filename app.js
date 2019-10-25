const argv = require('./config/yargs').argv;
const colors = require('colors');

const tareas = require('./todo/todo');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let nuevaTarea = tareas.crear(argv.descripcion);
        console.log(nuevaTarea);
        break;

    case 'listar':
        let listado = tareas.getListado();
        listado.forEach(tarea => {
            console.log('========= TO DO ========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('-------------------------'.green);
        });
        // tambien se puede hacer con un blucle:  for (let tarea of listado) {}
        break;

    case 'actualizar':
        let actualizado = tareas.actualizar(argv.descripcion, argv.completado);
        if (actualizado) console.log('OK');
        break;

    case 'borrar':
        let borrado = tareas.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
        break;

}