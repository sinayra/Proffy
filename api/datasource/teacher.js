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
        return await this.db.create({ user_id: user._id });
    }

    async getTeacherById(id) {
        return await this.db.findById(id);
    }

}

module.exports = TeacherAPI;