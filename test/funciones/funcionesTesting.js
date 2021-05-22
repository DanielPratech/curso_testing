/**
 * Mi librería
 */

const esperoQue = (dato) => {
    return {
        seaIgual: (esperado) => {
            if (dato !== esperado)
                throw new Error(`${dato} es diferente a ${esperado}`);
        }
    }
};

const prueba = (titulo, funcion) => {
    try {
        funcion();
        console.log(`Ok ${titulo} `);
    } catch (error) {
        console.error(`Err ${titulo}`);
        console.error(error);
    }
}

module.exports = { esperoQue };