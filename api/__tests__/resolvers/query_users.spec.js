const { expect, should } = require('chai');
const { gql } = require('apollo-server-express');
const { testClient, connectToDb, dropTestDb, closeDbConnection, apis } = require('../../__testSetup__/setup');

const { query, mutate } = testClient;
const {
    scheduleAPI,
    studentAPI,
    teacherAPI,
    userAPI
} = apis;

describe('users : UserListResponse', () => {

    before(async () => {
        await connectToDb();
        await dropTestDb();
    });

    after(async () => {
        await dropTestDb();
        await closeDbConnection();
    });

    it('Get successful list of users', async () => {
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

        await userAPI.create(obj1);
        await userAPI.create(obj2);

        const GET_USERS = gql`
            query getUsers{
                users {
                    code
                    success
                    users{
                        email
                    }
                    error
                }
            }
        `;

        const { data } = await query({
            query: GET_USERS
        });
        expect(data).to.have.property('users');
        expect(data.users).to.have.property('code');
        expect(data.users).to.have.property('success');
        expect(data.users).to.have.property('users');
        expect(data.users).to.have.property('error');

        const {
            code, success, users, error
        } = data.users;

        expect(code).to.equal('200');
        expect(success).to.be.true;
        expect(error).to.be.null;
        expect(users).to.have.lengthOf(2);

        const [elem1, elem2] = users;

        expect(elem1).to.have.property('email', obj1.email);
        expect(elem1).to.not.have.property('name');
        expect(elem2).to.have.property('email', obj2.email);
        expect(elem2).to.not.have.property('name');
    });
});