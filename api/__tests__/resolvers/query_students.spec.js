const { expect } = require('chai');
const { gql } = require('apollo-server-express');
const { testClient, connectToDb, dropTestDb, closeDbConnection, apis } = require('../../__testSetup__/setup');

const { query, mutate } = testClient;
const {
    scheduleAPI,
    studentAPI,
    teacherAPI,
    userAPI
} = apis;

describe('students : StudentListResponse', () => {

    before(async () => {
        await connectToDb();
        await dropTestDb();
    });

    after(async () => {
        await dropTestDb();
        await closeDbConnection();
    });

    beforeEach(async () => {
        await dropTestDb();
    });

    it('Get successful list of students', async () => {
        const obj1 = {
            name: 'John Doe',
            email: 'email1@email.com',
            hash: '1234',
            role: 'TEACHER'
        };
        const obj2 = {
            name: 'Jane Doe',
            email: 'email2@email.com',
            hash: '1234',
            role: 'STUDENT'
        }

        const teacher = await userAPI.create(obj1);
        const student = await userAPI.create(obj2);
        await studentAPI.create({
            user_id: student._id
        });
        await teacherAPI.create({
            user_id: teacher._id
        });

        const GET_STUDENTS = gql`
            query getStudents{
                students {
                    code
                    success
                    students{
                        user {
                            email
                        }
                    }
                }
            }
        `;

        const { data } = await query({
            query: GET_STUDENTS
        });

        expect(data).to.have.property('students');
        expect(data.students).to.have.property('code');
        expect(data.students).to.have.property('success');
        expect(data.students).to.have.property('students');

        const {
            code, success, students
        } = data.students;

        expect(code).to.equal('200');
        expect(success).to.be.true;
        expect(students).to.have.lengthOf(1);

        expect(students[0]).to.have.property('user').to.have.property('email', obj2.email);

    });

    it('Check error message when database connection is closed', async () => {
        
        await closeDbConnection();

        const GET_STUDENTS = gql`
            query getStudents{
                students {
                    code
                    success
                    students{
                        user {
                            email
                        }
                    }
                }
            }
        `;

        const { data } = await query({
            query: GET_STUDENTS
        });

        expect(data).to.have.property('students');
        expect(data.students).to.have.property('code', '503');
        expect(data.students).to.have.property('success', false);

        await connectToDb();
       
    }).timeout(15000);

});