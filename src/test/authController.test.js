const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Authentication Controller', () => {
  it('should return a JWT on successful login', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.token, 'JWT token not found in the response');
        return done();
      });
  });

  it('password should contain at least two characters and two number no special characters', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'validuser', password: 'invalidpassword' })
      .expect(401, done);
  });

  it('username and password should be available', (done) => {
    request(app)
      .post('/login')
      .send({ username: '', password: '' })
      .expect(401, done);
  });
});
