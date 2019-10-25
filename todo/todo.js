const fs = require('fs');

let arrTareas = [];


const leerDB = () => {
    /* usando el require es mas facil
    fs.readFile('db/data.json', (err, data) => {
        if (err)
            throw new Error('Error al leer el fichero', err)
        else {
            console.log(data)

        }
    })
    */

    try {
        arrTareas = require('../db/data.json');
    } catch (error) {
        arrTareas = [];
    }

};

const guardarDB = () => {
    let data = JSON.stringify(arrTareas);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error al grabar el fichero', err);
    })
};


const crear = (descripcion) => {

    leerDB();

    let tarea = {
        descripcion, // es lo mismo que => descripcion: descripcion,
        completado: false
    };
    arrTareas.push(tarea);

    guardarDB();

    return tarea; //por enviar algo
}


const getListado = () => {
    leerDB();
    return arrTareas;
}


const actualizar = (descripcion, completado = true) => {
    leerDB();
    // devuelve el indice de la tarea de arrTareas cuya descripcion coincide con la enviada por parametro (si no coincide ninguna devuelve -1)
    let index = arrTareas.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        arrTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    leerDB();

    /*
    //asi esta bien, pero es mas facil como esta abajo (con filter)
    let index = arrTareas.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        let arrTareasTemp = [];
        for (let i = 0; i <= arrTareas.length - 1; i++) {
            if (i != index) {
                arrTareasTemp.push(arrTareas[i]);
            }
        }
        arrTareas = arrTareasTemp;
        guardarDB();
        return true;
    } else {
        return false;
    }
    */
    //se puede hacer con la funcion JS 'filter' que crea un array con los items que cumplen la condicion del predicado
    let arrTareasTemp = arrTareas.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (arrTareasTemp.length === arrTareas.length) {
        return false; //no se elimino nada
    } else {
        arrTareas = arrTareasTemp;
        guardarDB();
        return true; //para informar q si se grabo algo
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}