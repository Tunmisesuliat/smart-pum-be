import db from '../../db/index.js';

/**
 * Contains a collection of service methods for managing user resource on the app.
 * @class UserService
 *
 */
export default class UserServices {
    /**
     * Retrieves a user from the database by their email address.
     * 
     * @param {Object} params - The parameters for the query.
     * @param {string} params.email - The email of the user to retrieve.
     * @returns {Object|undefined} - Returns the user object if found, otherwise undefined.
     * @memberof UserServices
     */
    static async getUserByEmail({ email }) {
        return db.data.users.find(user => user.email === email)
    }

    /**
     * Retrieves a user from the database by their ID.
     * 
     * @param {Object} params - The parameters for the query.
     * @param {string} params.userId - The ID of the user to retrieve.
     * @returns {Object|undefined} - Returns the user object if found, otherwise undefined.
     * @memberof UserServices
     */
    static async getUserById({ userId }) {
        return db.data.users.find(user => user._id === userId
        );
    }

    /**
     * Updates the details of the authenticated user.
     * 
     * @param {Object} params - The parameters for the query.
     * @param {string} params.userId - The ID of the user to update.
     * @param {string} [params.firstName] - The first name of the user to update.
     * @param {string} [params.lastName] - The last name of the user to update.
     * @param {string} [params.email] - The email of the user to update.
     * @param {string} [params.phone] - The phone of the user to update.
     * @param {string} [params.company] - The company of the user to update.
     * @param {string} [params.address] - The address of the user to update.
     * @param {Object} user - The user object to update.
     * @returns {Object} - Returns the updated user object.
     * @memberof UserServices
     */
    static async updateUserDetails({ userId, firstName, lastName, email, phone, company, address }, user) {

        user.name.first = firstName ?? user.name.first;
        user.name.last = lastName ?? user.name.last;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.company = company ?? user.company;
        user.address = address ?? user.address;

        db.write();

        return user;
    }
}
