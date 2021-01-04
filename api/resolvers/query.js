module.exports = {
    users: async (parent, args, { dataSources }, info) => {
        return await dataSources.userAPI.getUsers();
    },

    teachers: async (parent, { teacher }, { dataSources }, info) => {
        if (!teacher || !teacher.schedules) {
            return await dataSources.teacherAPI.getTeachers(teacher);
        }

        const filteredSchedules = await dataSources.scheduleAPI.getSchedules(teacher.schedules);

        if (filteredSchedules.length > 0) {
            let set = new Set();
            filteredSchedules.forEach(elem => {
                set.add(elem.teacher_id);
            });

            const teacher_ids = Array.from(set);
            return teacher_ids.map((id) => dataSources.teacherAPI.findTeacher({ _id: id, ...teacher }));
        }
        return null;
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