let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest API',() => {
    it('Should test / endpoint',(done) => {
        chai
        .request('http://localhost:9700')
        .get('/')
        .then((res) =>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
    it('Should test /health endpoint',(done) => {
        chai
        .request('http://localhost:9700')
        .get('/health')
        .then((res) =>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
    it('Should test /addUser endpoint',(done) => {
        chai
        .request('http://localhost:9700')
        .post('/addUser')
        .send({"_id":87897878,"name":"test_user","city":"Delhi","phone":8767,"active":true})
        .then((res) =>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
})