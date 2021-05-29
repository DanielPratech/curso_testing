const chai = require('chai');
const chaiFetch = require('chai-fetch');
const http = require('http');
const mockServer = require("http-server-mock").getLocal();
chai.use(chaiFetch);

const { expect } = chai;

//mockear respuesta de servidores

describe('Chai-fetch', () => {

    beforeEach(() => { mockServer.start(9091) });
    afterEach(() => mockServer.stop());

    describe('.responseText', () => {
        it('should match responses with matching bodies', () => {
            mockServer.get('/match').thenReply(200, 'matching body')
                .then(() =>
                    expect(fetch('http://localhost:8080/match')).to.have.responseText('matching body')
                );
        });

        it('should not match responses with matching bodies', () => {
            mockServer.get('/match').thenReply(500, 'matching body')
                .then(() =>
                    expect(fetch('http://localhost:9091/match')).to.have.status(500)
                );
        });
    });
});