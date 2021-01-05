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

describe.only('logout: AuthResponse', () => {

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


    it('Successfully logged out', async () => {
        context.setUser({
            _id: '123456789',
            email: 'email@email.com',
            role: 'STUDENT'
        });

        context.res.cookie("token", "12345");

        const LOGOUT = gql`
            mutation loggedOut{
                logout {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: LOGOUT
        });

        expect(data).to.have.property('logout');
        expect(data.logout).to.have.property('code', '204');
        expect(data.logout).to.have.property('success', true);
        expect(data.logout).to.have.property('user').to.be.null;

        expect(context.res.headers["token"]).to.be.empty;

        context.setUser(null);

    });

    it('Check error message if user try to loggout without set user context', async () => {

        context.res.cookie("token", "12345");

        const LOGOUT = gql`
            mutation loggedOut{
                logout {
                    code
                    success
                    user{
                        email
                    }
                }
            }
        `;

        const { data } = await mutate({
            mutation: LOGOUT
        });

        expect(data).to.have.property('logout');
        expect(data.logout).to.have.property('code', '400');
        expect(data.logout).to.have.property('success', false);

        expect(context.res.headers["token"]).to.not.be.empty;

    });

});