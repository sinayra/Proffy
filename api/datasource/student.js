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

    async toogleFavoriteTeacher(id, teacherId) {
        let student = await this.getStudentById(id);
        let favorite_teacher_ids = student.favorite_teacher_ids;
        const index = favorite_teacher_ids.indexOf(teacherId);

        if (index < 0) {
            favorite_teacher_ids.push(teacherId);
        }
        else {
            favorite_teacher_ids.splice(index, 1);
        }

        await this.db.findByIdAndUpdate(id, { favorite_teacher_ids });
        student = await this.getStudentById(id);

        return student;
    }

    async addTeacherStudentConnection(id, teacherId) {
        let student = await this.getStudentById(id);
        let connected_teacher_ids = student.connected_teacher_ids;

        if (!connected_teacher_ids.includes(teacherId)) {
            connected_teacher_ids.push(teacherId);
            await this.db.findByIdAndUpdate(id, { connected_teacher_ids });
            student = await this.getStudentById(id);
        }

        return student;
    }

}

module.exports = StudentAPI;