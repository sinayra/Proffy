const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class TeacherAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getTeachers(teacher) {
        let filter = {};
        if (teacher) {
            const { day, area, price } = teacher;

            if (day) {
                filter.day = { '$in': day };
            }

            if (area) {
                filter.area = { '$in': area };
            }

            if (price) {
                filter.price = price;
            }
        }
        return await this.db.find(filter);
    }

    async addTeacher(user) {
        return await this.db.create({
            user_id: user._id
        });
    }

    async getTeacherById(id) {
        return await this.db.findById(id);
    }

    async getTeacherByUser(user) {
        return await this.db.findOne({ user_id: user._id });
    }

    async updateTeacher(id, input) {
        const { _id, ...data } = input;

        if (data.area) {
            let set = new Set();
            data.area.forEach(elem => {
                set.add(elem);
            });

            data.area = Array.from(set);
        }

        return await this.db.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
    }

}

module.exports = TeacherAPI;