const { DataSource } = require('apollo-datasource');

class ScheduleAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getSchedule() {
        return await this.db.find();
    }

    async getScheduleById(id) {
        return await this.db.findById(id);
    }

    async addSchedule(teacher_id, schedule) {
        const data = {
            ...schedule,
            teacher_id
        }

        return await this.db.create(data);
    }

    async updateSchedule(id, input) {
        const { _id, ...data } = input;

        await this.db.findByIdAndUpdate(
            id,
            {
                '$set': data
            }
        );

        return this.getScheduleById(id);
    }

    async deleteSchedule(id){
        console.log("DELETE");
        console.log(id);
        return await this.db.findByIdAndDelete(id);
    }
}

module.exports = ScheduleAPI;