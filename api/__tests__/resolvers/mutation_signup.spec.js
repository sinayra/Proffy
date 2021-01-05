const { expect } = require('chai');
const { gql } = require('apollo-server-express');
const { testClient, connectToDb, dropTestDb, closeDbConnection, apis, context } = require('../../__testSetup__/setup');

const { query, mutate } = testClient;
const {
    scheduleAPI,
    studentAPI,
    teacherAPI,
    userAPI
} = apis;

describe('signup(SignupInput!) : AuthResponse', () => {

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


    it('Successfully sign up a teacher', async () => {
        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'TEACHER'
        };

        const ADD_TEACHER = gql`
            mutation addTeacher($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_TEACHER,
            variables: {
                account: obj1
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '201');
        expect(data.signup).to.have.property('success', true);
        expect(data.signup).to.have.property('user');

        const { user } = data.signup;

        expect(user).to.have.property('email', obj1.email);
        expect(user).to.not.have.property('name');

        const teacherDBResult = await teacherAPI.find();
        const userDBResult = await userAPI.find();
        expect(teacherDBResult).to.have.lengthOf(1);
        expect(userDBResult).to.have.lengthOf(1);

    });

    it('Successfully sign up a student', async () => {
        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'STUDENT'
        };

        const ADD_STUDENT = gql`
            mutation addStudent($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_STUDENT,
            variables: {
                account: obj1
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '201');
        expect(data.signup).to.have.property('success', true);
        expect(data.signup).to.have.property('user');

        const { user } = data.signup;

        expect(user).to.have.property('email', obj1.email);
        expect(user).to.not.have.property('name');

        const studentDBResult = await studentAPI.find();
        const userDBResult = await userAPI.find();
        expect(studentDBResult).to.have.lengthOf(1);
        expect(userDBResult).to.have.lengthOf(1);

    });

    it('Cannot add ADMIN account via client', async () => {
        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'ADMIN'
        };

        const ADD_ADMIN = gql`
            mutation addAdmin($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    message
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_ADMIN,
            variables: {
                account: obj1
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '403');
        expect(data.signup).to.have.property('success', false);

        const userDBResult = await userAPI.find();
        expect(userDBResult).to.have.lengthOf(0);

    });

    it('Cannot add duplicate emails', async () => {
        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            hash: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'TEACHER'
        };

        const teacher = await userAPI.create(obj1);
        await teacherAPI.create({
            user_id: teacher._id
        });

        const obj2 = {
            name: 'Jane Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '12345678910',
            avatar: 'https://via.placeholder.com/450',
            role: 'STUDENT'
        };

        const ADD_STUDENT = gql`
            mutation addStudent($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    message
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_STUDENT,
            variables: {
                account: obj2
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '400');
        expect(data.signup).to.have.property('success', false);

        const teacherDBResult = await teacherAPI.find();
        const studentDBResult = await studentAPI.find();
        const userDBResult = await userAPI.find();

        expect(studentDBResult).to.have.lengthOf(0);
        expect(userDBResult).to.have.lengthOf(1);
        expect(teacherDBResult).to.have.lengthOf(1);

    });

    it('Cannot signup if user is logged in', async () => {
        context.setUser({
            _id: '123456789',
            email: 'email@email.com',
            role: 'STUDENT'
        });

        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'TEACHER'
        };

        const ADD_TEACHER = gql`
            mutation addTeacher($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_TEACHER,
            variables: {
                account: obj1
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '400');
        expect(data.signup).to.have.property('success', false);

        const teacherDBResult = await teacherAPI.find();
        expect(teacherDBResult).to.have.lengthOf(0);

        context.setUser(null);
    });

    it('Check error message when database connection is closed', async () => {
        
        await closeDbConnection();

        const obj1 = {
            name: 'John Doe',
            email: 'email@email.com',
            password: '1234',
            whatsapp: '123456789',
            avatar: 'https://via.placeholder.com/150',
            role: 'TEACHER'
        };

        const ADD_TEACHER = gql`
            mutation addTeacher($account: SignupInput!){
                signup(account: $account) {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: ADD_TEACHER,
            variables: {
                account: obj1
            }
        });

        expect(data).to.have.property('signup');
        expect(data.signup).to.have.property('code', '503');
        expect(data.signup).to.have.property('success', false);

        await connectToDb();
    }).timeout(15000);
});