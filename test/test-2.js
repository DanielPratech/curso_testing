/**
 * Node native assert
 */

const assert = require('assert');
const {suma, resta} = require('../funcionesMatematicas');

let resultado, esperado;

resultado = suma(2, 3);
esperado = 5;

assert.strictEqual(resultado, esperado);

resultado = resta(6, 3);
esperado = 3;

assert.strictEqual(resultado, esperado);

console.log('!Todo ok¡');