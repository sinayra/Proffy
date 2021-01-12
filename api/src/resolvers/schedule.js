module.exports = {
    async teacher(schedule, args, { dataSources }) {
        return await dataSources.teacherAPI.getTeacherById(schedule.teacher_id);
    },
}