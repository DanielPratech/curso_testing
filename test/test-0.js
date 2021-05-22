/**
 * Ejemplo más básico de un test en javascript. en este caso, falla
 */

const resultado = 1;
const esperado = 2;

if(resultado !== esperado){
    throw new Error(`${resultado} es diferente de ${esperado}`);
}

console.log('!Todo está ok¡');