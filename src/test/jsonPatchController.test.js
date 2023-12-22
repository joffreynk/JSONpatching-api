const assert = require('assert');
const request = require('supertest');
const app = require('../app');

let token;

describe('JSON Patch Controller', () => {
  before('login before patching and set token', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        return done();
      });
  });

  it('should apply JSON patch to the JSON object', (done) => {
    const jsonObject = { name: 'John', age: 30 };
    const jsonPatch = [{ op: 'replace', path: '/age', value: 31 }];

    request(app)
      .post('/patchjson')
      .set('token', token)
      .send({ jsonObject, jsonPatch })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual(
          res.body,
          { result: { name: 'John', age: 31 } },
          'Invalid patched JSON object',
        );
        done();
      });
  });

  it('should reject patching without a token header', (done) => {
    const jsonObject = { name: 'John', age: 30 };
    const jsonPatch = [{ op: 'replace', path: '/age', value: 31 }];

    request(app)
      .post('/patchjson')
      .send({ jsonObject, jsonPatch })
      .expect(401, done);
  });

  it('should reject patching with an invalid JWT token', (done) => {
    const jsonObject = { name: 'John', age: 30 };
    const jsonPatch = [{ op: 'replace', path: '/age', value: 31 }];
    request(app)
      .post('/patchjson')
      .set('token', 'invalid token')
      .send({ jsonObject, jsonPatch })
      .expect(403, done);
  });

  it('should reject patching with an invalid JSON object or patch', (done) => {
    request(app)
      .post('/patchjson')
      .set('token', token)
      .send({ jsonObject: 'invalid', jsonPatch: 'invalid' })
      .expect(401, done);
  });
});
