mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST images', () => {
  it('responds with 400 {api/images} - Empty request', (done) => {
    chai.request('http://api:8080')
    .post('/api/images')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });

  it('responds with 400 {api/images} - No file uploaded', (done) => {
    chai.request('http://api:8080')
    .post('/api/images')
    .field('description', 'A nice image')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });

  it('responds with 400 {api/images} - Invalid filetype', function(done) {
    chai.request('http://api:8080')
    .post('/api/images')
    .field('description', 'A nice image')
    .attach('file', '/usr/src/app/test_images/test_image.webp')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });

  it('responds with 400 {api/images} - Invalid filesize', function(done) {
    chai.request('http://api:8080')
    .post('/api/images')
    .field('description', 'A nice image')
    .attach('image', '/usr/src/app/test_images/test_image.jpg')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });

  it('responds with 201 {api/images} - Successful upload', function(done) {
    this.timeout(100000);
    chai.request('http://api:8080')
    .post('/api/images')
    .field('description', 'A nice image')
    .attach('image', '/usr/src/app/test_images/test_image.png')
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      done();
    });
  });

});