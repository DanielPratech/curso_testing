const chai = require('chai');
const chaiFetch = require('chai-fetch');
const mockServer = require("http-server-mock").getLocal();
const { fetchService } = require('../frontend');
const fetch=require('node-fetch')
chai.use(chaiFetch);

const { expect } = chai;

describe('fetchService', () => {
  
    describe('fetchService', () => {
        it('fetchService',async () => {
            await expect(fetch('http://localhost:8080/match')).to.have.responseText(`{"message":"Welcome to our Bookstore!"}`)
        });
    });
});