module.exports = {
    async user(teacher, args, { dataSources }) {
        return await dataSources.userAPI.getUserById(teacher.user_id);
    },
    async schedules(teacher, args, { dataSources }) {
        const schedules = [];

        for(let i = 0; i < teacher.schedule_ids.length; i++){
            const id = teacher.schedule_ids[i];
            schedules.push(await dataSources.scheduleAPI.getScheduleById(id));
        }

        return schedules;
    }
}