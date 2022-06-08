const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
chai.should();

describe('Admin Controls', () => {
    it('should return Admin', () => {
        chai.request(server)
            .get('/admin')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Admin');
            })
            .timeout(1000);
    }).timeout(1000);
}).timeout(1000);
