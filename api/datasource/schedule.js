const { DataSource } = require('apollo-datasource');

class ScheduleAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getSchedules(schedules) {
        let filter = {};

        let weekdays = schedules.map((schedule) => schedule.weekday);

        if (weekdays.length > 0) {
            let set = new Set();
            weekdays.forEach(elem => {
                set.add(elem);
            });

            filter.weekday = {
                '$in': Array.from(set)
            };
        }
        //get only the first interval
        if (schedules[0].from && schedules[0].to) {
            filter.from = {
                '$lt': schedules[0].to,
            };
            filter.to = {
                '$gte': schedules[0].from,
            };
        }

        return await this.db.find(filter);
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

    async deleteSchedule(id) {
        console.log("DELETE");
        console.log(id);
        return await this.db.findByIdAndDelete(id);
    }
}

module.exports = ScheduleAPI;