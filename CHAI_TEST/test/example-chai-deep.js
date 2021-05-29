const { suma } = require("../sum");
const chai = require('chai');
const chaiDeepMatch = require('chai-deep-match');
const expect = chai.expect;
chai.use(chaiDeepMatch);

context('Validando dos objetos con chai-deep', () => {
    const obj1 = { num1: 1, num2: 2, result: 3 };
    it('Deep', () => {
      expect(obj1).to.deep.match(suma(1, 2));
    });
  });