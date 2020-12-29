const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class TeacherAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getTeachers() {
        return await this.db.find();
    }

    async addTeacher(user) {
        return await this.db.create({
            user_id: user._id,
            bio: null,
            price: null,
            area: [],
            day: []
        });
    }

    async getTeacherById(id) {
        return await this.db.findById(id);
    }

    async getTeacherByUser(user) {
        return await this.db.findOne({ user_id: user._id });
    }

    async updateTeacher(id, input) {
        const { bio, price, area, day } = input;

        if (bio) {
            await this.db.findByIdAndUpdate(id, { bio });
        }

        if (price) {
            await this.db.findByIdAndUpdate(id, { price });
        }

        if (area) {
            let set = new Set();
            area.forEach(elem => {
                set.add(elem);
            });
            await this.db.findByIdAndUpdate(id, { area: Array.from(set) });
        }

        if (day) {

            let set = new Set();
            day.forEach(elem => {
                set.add(elem);
            });
            await this.db.findByIdAndUpdate(id, { day: Array.from(set) });
        }

        return this.getTeacherById(id);
    }

}

module.exports = TeacherAPI;