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

            if (teacher.area) {
                filter.area = { '$in': teacher.area };
            }

            if (teacher.price) {
                filter.price = teacher.price;
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

    async findTeacher(teacher) {
        let filter = {};

        filter._id = teacher._id;

        if (teacher.area) {
            filter.area = { '$in': teacher.area };
        }

        if (teacher.price) {
            filter.price = teacher.price;
        }

        return await this.db.findOne(filter);
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