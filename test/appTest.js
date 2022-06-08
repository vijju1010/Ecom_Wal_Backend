const { test1, test2 } = require('../test');
const assert = require('chai').assert;
// const expect = require('chai').expect;
// const should = require('chai').should();
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../app');
// chai.use(chaiHttp);
// chai.should();

describe('Test1', () => {
    it('should return test1', () => {
        assert.equal(test1(), 'test1');
    }).timeout(1000);
}).timeout(1000);
