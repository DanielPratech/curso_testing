/**
 * 
 * @param {Número 1} num1 
 * @param {Número 2} num2 
 * @returns La suma entre los dos números
 */
export const promiseSumFunction = (num1, num2) => {
    return new Promise(function (resolve, reject) {
        if (num1 < 0 || num2 < 0) {
            reject(new Error("No se pueden procesar números negativos"));
        } else {
            resolve(num1 + num2);
        }
    });
}

/**
 * 
 * @param {Número 1} num1 
 * @param {Número 2} num2 
 * @returns retorna un objeto con los dos números a sumar y el resultado
 */
export const promiseSumFunction2 = (num1, num2) => {
    return new Promise(function (resolve, reject) {
        if (num1 < 0 || num2 < 0) {
            reject({ num1, num2, error: "No se pueden procesar números negativos" });
        } else {
            resolve({ num1, num2, result: num1 + num2 });
        }
    });
}
