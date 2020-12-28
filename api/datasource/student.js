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
        return await this.db.create({ 
            user_id: user._id,
            favorite_teacher_ids: [],
            connected_teacher_ids: [],
        });
    }

    async getStudentById(id) {
        return await this.db.findById(id);
    }

    async getStudentByUser(user) {
        return await this.db.findOne({ user_id: user._id });
    }

}

module.exports = StudentAPI;