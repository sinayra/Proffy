const { AuthenticationError, ForbiddenError } = require('apollo-server');

module.exports = {
    addUser: async (parent, { account }, { dataSources }, info) => {
        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (existingUser) {
            throw new AuthenticationError("A user account with this email already exists");
        }

        const user = await dataSources.userAPI.addUser(account);
        
        const result = (account.role === 'STUDENT' ? 
            await dataSources.studentAPI.addStudent(user) : 
            await dataSources.teacherAPI.addTeacher(user)
        );

        return {
            _id: result._id,
            user
        }
    },
};