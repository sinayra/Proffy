module.exports = {
    async user(teacher, args, { dataSources }) {
        return await dataSources.userAPI.getUserById(teacher.user_id);
    }
}