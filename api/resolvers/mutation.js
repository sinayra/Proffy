module.exports = {
    addUser: async (parent, { account }, { dataSources }, info) => {
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