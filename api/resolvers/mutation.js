module.exports = {
    addUser: async (parent, { user }, { dataSources }, info) => {
        const newUser = await dataSources.userAPI.addUser(user);
        return (user.role === 'STUDENT' ? 
            await dataSources.studentAPI.addStudent(newUser) : 
            await dataSources.teacherAPI.addTeacher(newUser)
        );
    },
};