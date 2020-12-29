module.exports = {
    users: async (parent, args, { dataSources }, info) => {
        return await dataSources.userAPI.getUsers();
    },

    teachers: async (parent, { teacher }, { dataSources }, info) => {
        return await dataSources.teacherAPI.getTeachers(teacher);
    },

    students: async (parent, args, { dataSources }, info) => {
        return await dataSources.studentAPI.getStudents();
    },

    teacherByCurrentUser: async (parent, args, { dataSources, user }, info) => {
        return await dataSources.teacherAPI.getTeacherByUser(user);
    },

    studentByCurrentUser: async (parent, args, { dataSources, user }, info) => {
        return await dataSources.studentAPI.getStudentByUser(user);
    },

}