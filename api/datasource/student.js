const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class StudentAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getStudents() {
        return await this.db.find();
    }

    async addStudent(user) {
        return await this.db.create({ user_id: user._id });
    }

    async getStudentById(id) {
        return await this.db.findById(id);
    }

}

module.exports = StudentAPI;