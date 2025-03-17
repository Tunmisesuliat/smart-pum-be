import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import * as userFixtures from '../fixtures/user.fixture.js';

chai.use(chaiHttp);

const { expect } = chai;

const baseUrl = '/v1';

describe('User Endpoints', () => {
    describe('GET /user', () => {
        it('should return a 200 status code', (done) => {
            chai.request(app)
                .get(`${baseUrl}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST /user/login', () => {
        it('should return a 200 status code', (done) => {
            chai.request(app)
                .post(`${baseUrl}/user/login`)
                .send(userFixtures.correctUserLoginDetails)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('Login successful!');
                    expect(data).to.have.property('sessionToken');
                    process.env.USER_TOKEN = data.sessionToken;
                    done();
                });
        });
    });

    describe('POST /user/login', () => {
        it('should return 400 status code with invalid password', (done) => {
            chai.request(app)
                .post(`${baseUrl}/user/login`)
                .send(userFixtures.userLoginDetailsWithWrongPassword)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('error');
                    expect(message).to.equal('Invalid email or password');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('POST /user/login', () => {
        it('should return 400 status code with invalid email', (done) => {
            chai.request(app)
                .post(`${baseUrl}/user/login`)
                .send(userFixtures.userLoginDetailsWithWrongEmail)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('error');
                    expect(message).to.equal('Invalid email or password');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('GET /user/profile', () => {
        it('should return a 200 status code', (done) => {
            chai.request(app)
                .get(`${baseUrl}/user/profile`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.correctUserLoginDetails)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details retrieved successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('age');
                    expect(data).to.have.property('eyeColor');
                    expect(data).to.have.property('isActive');
                    expect(data).to.have.property('balance');
                    done();
                });
        });
    });

    describe('GET /user/profile', () => {
        it('should return a 401 status code without token', (done) => {
            chai.request(app)
                .get(`${baseUrl}/user/profile`)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('error');
                    expect(message).to.equal('Kindly login to continue');
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating last name only', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserLastNameOnly)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating first name only', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserFirstNameOnly)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating company only', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserCompanyOnly)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating address only', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserAddressOnly)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating last name only', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserLastNameOnly)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('should return a 200 status code when updating all details', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
                .send(userFixtures.updateUserAllDetails)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('success');
                    expect(message).to.equal('User details updated successfully');
                    expect(res).to.have.status(200);
                    expect(data).to.have.property('firstName');
                    expect(data).to.have.property('lastName');
                    expect(data).to.have.property('email');
                    expect(data).to.have.property('phone');
                    expect(data).to.have.property('company');
                    expect(data).to.have.property('address');
                    expect(data).to.have.property('picture');
                    done();
                });
        });
    })

    describe('PUT /user', () => {
        it('should return a 401 status code without token', (done) => {
            chai.request(app)
                .put(`${baseUrl}/user`)
                .send(userFixtures.updateUserAllDetails)
                .end((err, res) => {
                    const { message, status, data } = res.body;
                    expect(status).to.equal('error');
                    expect(message).to.equal('Kindly login to continue');
                    expect(res).to.have.status(401);
                    done();
                });
        });
    })

    describe('POST /user/login', () => {
        it('should return a 400 status code when an inactive user tries to login', (done) => {
            chai.request(app)
                .post(`${baseUrl}/user/login`)
                .send(userFixtures.inActiveUserLoginDetails)
                .end((err, res) => {
                    const { message, status } = res.body;
                    expect(status).to.equal('error');
                    expect(message).to.equal('User is not active');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});




