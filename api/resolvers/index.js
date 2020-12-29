const Query = require('./query');
const Mutation = require('./mutation');
const Student = require('./student');
const Teacher = require('./teacher');

const Date = require('./date')

module.exports = {
    Query,
    Mutation,
    Date,
    Student,
    Teacher,
    TeacherOrStudent: {
        __resolveType(obj){
            if(obj.user.role === 'STUDENT'){
                return 'Student';
            }

            if(obj.user.role === 'TEACHER'){
                return 'Teacher';
            }

            return null;
        }
    },
};