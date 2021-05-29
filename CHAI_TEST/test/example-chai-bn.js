/**
 * Ayuda a comprar números enteros usando la librería bn.js.
 * Instalación: npm install --save-dev chai-bn
 */

const chai = require('chai');
const expect = chai.expect;
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));


describe('Ejemplos de librería chai-bn', () => {
  context('Los números son iguales', () => {
    const actual = new BN('10000000000000000000').add(new BN('1'));
    const expected = '10000000000000000001';
    it('Comparando con equal', () => {
      expect(actual).to.be.a.bignumber.that.equal(expected);
    });
    it('Comparando con equals', () => {
      expect(actual).to.be.a.bignumber.that.equals(expected);
    });
    it('Comparando con eq', () => {
      expect(actual).to.be.a.bignumber.that.eq(expected);
    });
  });

  context('Un número es mayor que el otro', () => {
    const minor = new BN('10000000000000000000').add(new BN('1'));
    const major = minor.addn(1);
    it('Comparando con above', () => {
      expect(major).to.be.a.bignumber.that.above(minor);
    });
    it('Comparando con gt', () => {
      expect(major).to.be.a.bignumber.that.gt(minor);
    });
    it('Comparando con greaterThan', () => {
      expect(major).to.be.a.bignumber.that.greaterThan(minor);
    });
  });

  context('Un número es menor que el otro', () => {
    const minor = new BN('10000000000000000000').add(new BN('1'));
    const major = minor.addn(1);
    it('Comparando con below', () => {
      expect(minor).to.be.a.bignumber.that.below(major);
    });
    it('Comparando con lt', () => {
      expect(minor).to.be.a.bignumber.that.lt(major);
    });
    it('Comparando con lessThan', () => {
      expect(minor).to.be.a.bignumber.that.lessThan(major);
    });
  });

  context('Un número es mayor o igual que el otro', () => {
    const minor = new BN('10000000000000000000').add(new BN('1'));
    const major = minor.addn(1);
    it('Comparando con least', () => {
      expect(minor).to.be.a.bignumber.that.least(minor);
    });
    it('Comparando con gte', () => {
      expect(major).to.be.a.bignumber.that.gte(minor);
    });
  });

  context('Un número es menor o igual que el otro', () => {
    const minor = new BN('10000000000000000000').add(new BN('1'));
    const major = minor.addn(1);
    it('Comparando con most', () => {
      expect(major).to.be.a.bignumber.that.most(major);
    });
    it('Comparando con lte', () => {
      expect(minor).to.be.a.bignumber.that.lte(major);
    });
  });

  context('Un número es negativo', () => {
    const negativeNumber = new BN('1').add(new BN('-10000000000000000000000'));
    it('Comparando con negative', () => {
      expect(negativeNumber).to.be.a.bignumber.that.negative;
    });
  });

  context('Un número es igual a cero', () => {
    const zero = new BN('10000000000000000000000').add(new BN('-10000000000000000000000'));
    it('Comparando con zero', () => {
      expect(zero).to.be.a.bignumber.that.zero;
    });
  });
});