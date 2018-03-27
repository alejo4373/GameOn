const db = require('../db/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

//Set up chai to use http
chai.use(chaiHttp)
describe('User Auth', () => {
  describe('POST /register', () => {
    it('It should create a new user', (done) => {
      let newUser = { 
        username: 'Pablo2006',
        password: 'alejo',
        fullname: 'Pablo Pelliza Franco',
        zipcode: '11369',
        email: 'pablopellizafranco@gmail.com',
        sports: '[{"sport_id": 1}]'
      } 
      chai.request(server)
          .post('/signup')
          .send(newUser)
          .end((err, res) => {
            console.log('hello ====>', res.status)
            console.log('hello ====>', res.data)
            res.should.have.status(200);
            res.body.should.be.a('array');
            done()
          })
    })
  })
})