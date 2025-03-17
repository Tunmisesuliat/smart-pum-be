import _ from 'lodash';
import { Response, Helpers, Constants } from '../../utils/index.js';
import UserServices from './user.service.js';

/**
 * controllers that contains methods for managing user endpoints
 * @class UserController
 */
class UserController {
    /**
     * Authenticates a user using their email and password.
     *
     * @param {Object} req - The request object containing the user's login credentials.
     * @param {string} req.body.email - The email address of the user.
     * @param {string} req.body.password - The password of the user.
     * @param {Object} res - The response object used to send the result back to the client.
     * @returns {Object} A JSON response with a session token and user details if authentication is successful,
     *                   otherwise a 400 error if the credentials are invalid.
     * @memberof UserController
     */

    static async loginUser(req, res) {
        const { email, password } = req.body;

        req.body.email = email ? email.trim().toLowerCase() : null;

        const user = await UserServices.getUserByEmail({ email });

        if (!user) {
            logger.warn('Invalid email or password');
            return Response.error(res, `Invalid email or password`, 400);
        }

        if(!user.isActive) {
            logger.warn('User is not active');
            return res.status(403).json({ message: 'This is not a valid user' });
        }

        const passwordMatch = Helpers.comparePassword(password, user.hashed_password);
        if (!passwordMatch) {
            logger.warn('Invalid email or password');
            return Response.error(res, `Invalid email or password`, 400);
        }

        const sessionToken = await Helpers.generateAuthToken({ userId: user._id, status: user.isActive });
        const data = _.pick(user, Constants.userDetails);
        data.firstName = user.name.first;
        data.lastName = user.name.last;
        data.sessionToken = sessionToken;

        logger.info('Login successful!');
        return Response.info(res, 'Login successful!', 200, data);
    }

    /**
     * Retrieves the details of the authenticated user.
     *
     * @param {Object} req - The request object containing the authenticated user's information.
     * @param {Object} res - The response object used to send the result back to the client.
     * @returns {Object} A JSON response with the user's details if found,
     *                   otherwise a 404 error if the user is not found.
     * @memberof UserController
     */

    static async getUserdetails(req, res) {
        const { userId } = req.user;
        const user = await UserServices.getUserById({ userId });

        if (!user) {
            logger.warn('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const data = _.pick(user, Constants.userDetails);
        
        data.firstName = user.name.first;
        data.lastName = user.name.last;

        logger.info(`User details retrieved successfully: ${data}`);

        return Response.info(res, 'User details retrieved successfully', 200, data);
    }

    /**
     * Updates the details of the authenticated user.
     *
     * @param {Object} req - The request object containing the authenticated user's information.
     * @param {Object} res - The response object used to send the result back to the client.
     * @returns {Object} A JSON response with the updated user's profile details if successful,
     *                   otherwise a 404 error if the user is not found.
     * @memberof UserController
     */
    static async updateUserDetails(req, res) {
        const { userId } = req.user;
        const { firstName, lastName, email, phone, company, address } = req.body;
        const userExist = await UserServices.getUserById({ userId });

        if (!userExist) {
            logger.warn('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await UserServices.updateUserDetails({ userId, firstName, lastName, email, phone, company, address }, userExist);

        const data = _.pick(updatedUser, Constants.updateUserDetails);
        data.firstName = updatedUser.name.first;
        data.lastName = updatedUser.name.last;

        logger.info(`User details updated successfully`);

        return Response.info(res, 'User details updated successfully', 200, data);
    }
}

export default UserController;
