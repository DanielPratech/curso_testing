const {suma, resta} = require("../funcionesMatematicas");
const {esperoQue} = require("./funciones/funcionesTesting");

let resultado, esperado;

resultado = suma(2,3);
esperado = 2;

// expect
esperoQue(resultado).seaIgual(esperado);

console.log('Todo esta ok!')