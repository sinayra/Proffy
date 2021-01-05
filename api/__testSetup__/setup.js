require('dotenv').config();

const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('../schema');
const resolvers = require('../resolvers');

const UserAPI = require('../datasource/user');
const StudentAPI = require('../datasource/student');
const TeacherAPI = require('../datasource/teacher');
const ScheduleAPI = require('../datasource/schedule');
const UserDBModel = require('../model/user');
const TeacherDBModel = require('../model/teacher');
const StudentDBModel = require('../model/student');
const ScheduleDBModel = require('../model/schedule');

class Context {
    constructor() {
        this.req = {
            body: {}
        };

        this.res = {
            query: {},
            headers: {},
            data: null,
            json(payload) {
                this.data = JSON.stringify(payload);
            },
            cookie(name, value, options) {
                this.headers[name] = value;
            },
            clearCookie(name){
                this.headers[name] = "";
            }
        };

        this.user = null;
    }

    getContext() {
        return {
            res: this.res,
            user: this.user
        }
    }

    setUser(user){
        this.user = user
    }
}

const apis = {
    userAPI: UserDBModel,
    studentAPI: StudentDBModel,
    teacherAPI: TeacherDBModel,
    scheduleAPI: ScheduleDBModel,
}

const dataSources = () => ({
    userAPI: new UserAPI(UserDBModel),
    studentAPI: new StudentAPI(StudentDBModel),
    teacherAPI: new TeacherAPI(TeacherDBModel),
    scheduleAPI: new ScheduleAPI(ScheduleDBModel),
});

const connectToDb = async () => {
    await mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/${process.env.MONGODB_TEST_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .catch(error => console.error(error));
}

const dropTestDb = async () => {
    if (process.env.NODE_ENV === 'testing') {
        await mongoose.connection.db.dropDatabase()
            .catch(error => console.error(error));
    }
}

const closeDbConnection = async () => {
    await mongoose.connection.close()
        .catch(error => console.error(error));
}

const context = new Context();

const server = new ApolloServer({
    dataSources,
    typeDefs,
    resolvers,
    context,
});

module.exports = {
    testClient: createTestClient(server),
    apis,
    connectToDb,
    closeDbConnection,
    dropTestDb
}