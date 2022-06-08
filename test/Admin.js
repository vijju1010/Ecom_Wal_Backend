const assert = require('chai').assert;
const expect = require('chai').expect;
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

    describe('Should not add Category without token', () => {
        it('should not add Category without token', (done) => {
            chai.request(server)
                .post('/admin/categories')
                .send({
                    category: 'category demo',
                })
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message');
                    res.body.message.should.eq('Unauthorized');
                    done();
                });
        });
    }).timeout(1000);
    describe('Should not add Category with invalid token', () => {
        it('should not add Category with invalid token', (done) => {
            chai.request(server)
                .post('/admin/categories')
                .send({
                    category: 'category demo',
                })
                .set('Content-Type', 'application/json')
                .set('Authorization', 'token invalid')
                .end((err, res) => {
                    // console.log(res.body, 'res.body');
                    // res.should.have.status(401);
                    res.body.should.have.property('message');
                    res.body.message.should.eq('Unauthorized');
                    done();
                });
        });
    }).timeout(1000);

    describe('Should add Category with valid token', () => {
        it('should add Category with valid token', (done) => {
            chai.request(server)
                .post('/admin/categories')
                .send({
                    category: 'category demo',
                })
                .set('Content-Type', 'application/json')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBncmVwLmNvbSIsIm5hbWUiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNjU0Njg0NDgzfQ.36DT52WxlapVdaIqbe5je5RixhpFYOAPbEOwRnPDMaQ'
                )
                .end((err, res) => {
                    // console.log(res.body, 'res.body');
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.eq('Category added successfully');
                    done();
                })
                .timeout(1000);
        }).timeout(1000);
    }).timeout(1000);
}).timeout(1000);
