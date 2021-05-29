import { expect } from 'chai';
import { promiseSumFunction } from '../promise';
import { promiseSumFunction2 } from '../promise';

const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const should = chai.should;
chai.use(should);
chai.use(chaiAsPromise);

const Obj = {
    num1: 1,
    num2: 2,
    result: 3
}

describe('Promise testing', () => {
    it('Promise resolve', () => {
        return promiseSumFunction(1, 2).should.eventually.eq(3);
    });

    it('Promise reject', () => {
        return promiseSumFunction(2, -2).should.be.rejected;
    });

    it('Promise resolve with have', () => {
        return promiseSumFunction2(2, 2).then(resp => {
            resp.should.have.property('result');
        });
    });

    it('Promise resolve with become', () => {
        return promiseSumFunction2(1, 2).should.become(Obj);
    });

    it('Promise resolve with become', () => {
        return promiseSumFunction2(1, 2).should.become(Obj);
    });

    it('Multiple promise', () => {
        return Promise.all([
            promiseSumFunction(1, 2).should.eventually.eq(3),
            promiseSumFunction(2, -2).should.be.rejected,
            promiseSumFunction2(1, 2).should.become(Obj),
            promiseSumFunction2(1, 2).should.become(Obj)
        ]);
    });
});