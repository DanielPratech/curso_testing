const chai = require('chai');
const chaiFetch = require('chai-fetch');
const mockServer = require("http-server-mock").getLocal();
const { fetchService } = require('../frontend');

chai.use(chaiFetch);

const { expect } = chai;

describe('fetchService', () => {

    beforeEach(() => { mockServer.start(9090) });
    afterEach(() => mockServer.stop());
    describe('fetchService', () => {
        it('fetchService', () => {
           mockServer.get('/match').thenReply(200, {
                message: "Welcome to our Bookstore!"
            })
                .then(async () => {
                    const response = await fetchService()
                    expect(response).to.be.equal({
                        message: "Welcome to our Bookstore!"
                    });
                }).catch(err => {
                    console.log('*********Error', err)
                });
        });
    });
});