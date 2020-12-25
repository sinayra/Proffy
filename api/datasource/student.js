const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class StudentAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    getStudents() {
        return this.db.find();
    }

    async addStudent(user) {
        const newStudent = await this.db.create({
            user
        });
        return newStudent;
    }

}

module.exports = StudentAPI;