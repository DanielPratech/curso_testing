const assert = require('chai').assert;
const expect = require('chai').expect;
//const numbers = [1,2,3,4,5];

const a = "Hola mundo";
const b = "Hola mundo";
describe('', () => {
    expect(a).to.deep.equal(b);
    expect(a).to.equal(b);
})

console.log("Todo ok");