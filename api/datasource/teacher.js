const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class TeacherAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    getTeachers() {
        return this.db.find();
    }

    async addTeacher(user) {
        const newTeacher = await this.db.create({
            user
        });
        return newTeacher;
    }

}

module.exports = TeacherAPI;