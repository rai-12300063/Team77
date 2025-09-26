const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Admin Authentication and Authorization', () => {
  let adminToken;
  let studentToken;
  let instructorToken;

  before(async function() {
    this.timeout(10000);

    // Clean up existing test users
    await User.deleteMany({ email: { $in: ['testadmin@test.com', 'teststudent@test.com', 'testinstructor@test.com'] } });

    // Create test admin user
    const adminRes = await chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Admin',
        email: 'testadmin@test.com',
        password: 'password123',
        role: 'admin'
      });

    adminToken = adminRes.body.token;

    // Create test student user
    const studentRes = await chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Student',
        email: 'teststudent@test.com',
        password: 'password123',
        role: 'student'
      });

    studentToken = studentRes.body.token;

    // Create test instructor user
    const instructorRes = await chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Instructor',
        email: 'testinstructor@test.com',
        password: 'password123',
        role: 'instructor'
      });

    instructorToken = instructorRes.body.token;
  });

  describe('Admin Routes Access Control', () => {
    it('should allow admin to access admin stats', (done) => {
      chai.request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('stats');
          done();
        });
    });

    it('should allow admin to get all users', (done) => {
      chai.request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should deny student access to admin routes', (done) => {
      chai.request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${studentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.include('Admin role required');
          done();
        });
    });

    it('should deny instructor access to admin routes', (done) => {
      chai.request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${instructorToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.include('Admin role required');
          done();
        });
    });
  });

  describe('Course Routes Access Control', () => {
    it('should allow instructor to create courses', (done) => {
      chai.request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'Test Course',
          description: 'Test Description',
          difficulty: 'beginner'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should deny student access to create courses', (done) => {
      chai.request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          title: 'Test Course',
          description: 'Test Description',
          difficulty: 'beginner'
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.include('Instructor/Admin role required');
          done();
        });
    });
  });

  describe('Role Information in Auth Responses', () => {
    it('should include role in login response', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'testadmin@test.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('role');
          expect(res.body.role).to.equal('admin');
          done();
        });
    });

    it('should include role in profile response', (done) => {
      chai.request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('role');
          expect(res.body.role).to.equal('admin');
          done();
        });
    });
  });

  after(async () => {
    // Clean up test users
    await User.deleteMany({ email: { $in: ['testadmin@test.com', 'teststudent@test.com', 'testinstructor@test.com'] } });
  });
});