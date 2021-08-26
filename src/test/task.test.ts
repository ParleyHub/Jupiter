// /* eslint-disable import/no-extraneous-dependencies */

// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';

// import server from '../server';

// const should = chai.should();

// chai.use(chaiHttp);

// describe('/First Test Collection', () => {
//   it('test api', (done) => {
//     const payload = {
//       email: 'hiep@gmail.com',
//       name: 'Hiep Nguyen',
//       password: '12345678',
//       confirmPassword: '12345678',
//     };

//     chai
//       .request(server)
//       .post('/api/auth/sign-up')
//       .send(payload)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         res.body.should.have.key('access-token', 'refresh-token');

//         done();
//       });
//   });
// });
