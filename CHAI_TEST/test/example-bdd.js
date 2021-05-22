// Agregamos la librería de afirmaciones
const expect = require('chai').expect;

// Definimos el comportamiento del test
describe('Calcular la suma de 2 números', () => {
    const num1 = 2;
    const num2 = 3;
    // Definimos el primer paso para ejecutar el comportamiento
    it('Se sumarán los valores de 2 + 3 y se espera el valor 5', () => {

        expect(num1 + num2).to.be.equals(5);
    });
});