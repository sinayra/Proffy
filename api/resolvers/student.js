module.exports = {
    async user(student, args, { dataSources }) {
        return await dataSources.userAPI.getUserById(student.user_id);
    },

    async favorites(student, args, { dataSources }) {
        const favorites = [];

        for(let i = 0; i < student.favorite_teacher_ids.length; i++){
            const id = student.favorite_teacher_ids[i];
            favorites.push(await dataSources.teacherAPI.getTeacherById(id));
        }

        return favorites;
    },

    async connected(student, args, { dataSources }) {
        const connected = [];

        for(let i = 0; i < student.connected_teacher_ids.length; i++){
            const id = student.connected_teacher_ids[i];
            connected.push(await dataSources.teacherAPI.getTeacherById(id));
        }

        return connected;
    }
}