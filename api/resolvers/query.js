module.exports = {
    users: async (parent, args, { dataSources }, info) => {
        return await dataSources.userAPI.getUsers();
    },

    teachers: async (parent, args, { dataSources }, info) => {
        return await dataSources.teacherAPI.getTeachers();
    },

}