const Query = require('./query');
const Mutation = require('./mutation');
const Student = require('./student');
const Teacher = require('./teacher');
const { Date, Time, Weekday } = require('./scalar');

module.exports = {
    Query,
    Mutation,
    Date,
    Time,
    Weekday,
    Student,
    Teacher,
    TeacherOrStudent: {
        __resolveType(obj) {
            if (obj.user.role === 'STUDENT') {
                return 'Student';
            }

            if (obj.user.role === 'TEACHER') {
                return 'Teacher';
            }

            return null;
        }
    },
    MutationResponse: { //I dont like this fix
        __resolveType() {
          return null;
        }
      }
};