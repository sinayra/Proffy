const { AuthenticationError, ForbiddenError } = require('apollo-server');
const auth = require('../util/auth');

module.exports = {
    signup: async (parent, { account }, { dataSources, res }, info) => {
        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (existingUser) {
            throw new AuthenticationError("A user account with this email already exists");
        }

        const user = await dataSources.userAPI.addUser(account);

        let result;
        if (account.role === 'STUDENT'){
            result = await dataSources.studentAPI.addStudent(user);
        }
        else if (account.role === 'TEACHER'){
            result = await dataSources.teacherAPI.addTeacher(user)
        }

        const token = auth.createToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
        });

        return {
            user
        }
    },

    logout: async (parent, args, { dataSources, res }, info) => {
        res.clearCookie("token");
        return {
            user: undefined,
        };
    },

    login: async (parent, { account }, { dataSources, res }, info) => {
        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (!existingUser) {
            throw new AuthenticationError("Incorrect email address or password.");
        }

        const isValidPassword = auth.verifyPassword(
            account.password,
            existingUser.hash
        );

        if (!isValidPassword) {
            throw new AuthenticationError("Incorrect email address or password.");
        }

        const token = auth.createToken(existingUser);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
        });

        return {
            user: existingUser
        }
    }
};