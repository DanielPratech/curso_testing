/**
 * Testing funcionesMatematicas
 */

const { suma, resta } = require('../funcionesMatematicas');

let resultado, esperado;

//Para suma (2 + 3)
resultado = suma(2, 3);
esperado = 5;

if (resultado !== esperado)
    throw new Error(`${resultado} es diferente de ${esperado}`);

//Para suma (2 + 3)
resultado = resta(9, 3);
esperado = 6;

if (resultado !== esperado)
    throw new Error(`${resultado} es diferente de ${esperado}`);

console.log('!Todo está ok¡');