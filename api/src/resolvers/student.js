module.exports = {
    async user(student, args, { dataSources }) {
        return await dataSources.userAPI.getUserById(student.user_id);
    },

    async favorites(student, args, { dataSources }) {
        return student.favorite_teacher_ids.map(
            async (id) => await dataSources.teacherAPI.getTeacherById(id)
        );
    },

    async connected(student, args, { dataSources }) {
        return student.connected_teacher_ids.map(
            async (id) => await dataSources.teacherAPI.getTeacherById(id)
        );
    }
}