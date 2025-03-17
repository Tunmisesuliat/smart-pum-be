import { expect } from 'chai';
import { comparePassword, hashPassword, generateAuthToken, verifyToken } from '../../app/utils/helpers.js';

const plainPassword = 'password123';
let hashedPassword;

describe('Helper Functions', () => {

    before(async () => {
        hashedPassword = await hashPassword(plainPassword);
    });

    describe('comparePassword', () => {
        it('should return true for correct password comparison', () => {
            const result = comparePassword(plainPassword, hashedPassword);
            expect(result).to.be.true;
        });

        it('should return false for incorrect password comparison', () => {
            const result = comparePassword('wrongPassword', hashedPassword);
            expect(result).to.be.false;
        });
    });

    describe('hashPassword', () => {
        it('should generate a hashed password', async () => {
            const hash = await hashPassword(plainPassword);
            expect(hash).to.be.a('string');
            expect(hash).to.not.equal(plainPassword);
        });
    });

    describe('generateAuthToken', () => {
        it('should generate a JWT token', async () => {
            const data = { userId: '123' };
            const token = await generateAuthToken(data);
            expect(token).to.be.a('string');
        });
    });

    describe('verifyToken', () => {
        it('should verify a valid token', async () => {
            const data = { userId: '123' };
            const token = await generateAuthToken(data);
            const decoded = verifyToken(token);
            expect(decoded).to.have.property('userId', '123');
        });

        it('should throw an error for invalid token', () => {
            const invalidToken = 'invalidToken';

            try {
                verifyToken(invalidToken);
            } catch (error) {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.include('jwt malformed');
            }
        });

    });

});
