module.exports = {
    users: async (parent, args, { dataSources }, info) => {
        return await dataSources.userAPI.getUsers();
    },

    teachers: async (parent, args, { dataSources }, info) => {
        let teachers = await dataSources.teacherAPI.getTeachers();

        for(let i = 0; i < teachers.length; i++){
            teachers[i].user = await dataSources.userAPI.getUserById(teachers[i].user_id);
            delete teachers[i].user_id;
        }
        
        return teachers;
    },

    students: async (parent, args, { dataSources }, info) => {
        let students = await dataSources.studentAPI.getStudents();

        for(let i = 0; i < students.length; i++){
            students[i].user = await dataSources.userAPI.getUserById(students[i].user_id);
            students[i].favorites = [];
            students[i].connected = [];

            for (let j = 0; j < students[i].favorite_teacher_ids; j++){
                students[i].favorites.push(await dataSources.teacherAPI.getTeacherById(students[i].user_id));
            }

            for (let j = 0; j < students[i].connected_teacher_ids; j++){
                students[i].connected.push(await dataSources.teacherAPI.getTeacherById(students[i].user_id));
            }

            delete students[i].user_id;
            delete students[i].favorite_teacher_ids;
            delete students[i].connected_teacher_ids;
        }

        return students;
    },

    teacherByCurrentUser: async (parent, args, { dataSources, user }, info) => {
        return await dataSources.teacherAPI.getTeacherByUser(user);
    },

}