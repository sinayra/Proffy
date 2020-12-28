const { AuthenticationError, ForbiddenError, ApolloError } = require('apollo-server');
const auth = require('../util/auth');

module.exports = {
    signup: async (parent, { account }, { dataSources, res, user }, info) => {

        if(user){
            throw new ApolloError("You must logout before create a new account");
        }

        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (existingUser) {
            throw new AuthenticationError("A user account with this email already exists");
        }

        if(account.role === 'ADMIN'){
            throw new ForbiddenError("Cannot creates an admin account via client.");
        }

        const newUser = await dataSources.userAPI.addUser(account);

        if (account.role === 'STUDENT'){
            await dataSources.studentAPI.addStudent(newUser);
        }
        else if (account.role === 'TEACHER'){
            await dataSources.teacherAPI.addTeacher(newUser)
        }

        const token = auth.createToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
        });

        return {
            user: newUser
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
    },
};