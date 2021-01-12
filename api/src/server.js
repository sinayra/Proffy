require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const depthLimit = require('graphql-depth-limit');

const UserAPI = require('./datasource/user');
const StudentAPI = require('./datasource/student');
const TeacherAPI = require('./datasource/teacher');
const ScheduleAPI = require('./datasource/schedule');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const auth = require('./util/auth');
const { RequiresRoleDirective } = require('./directives/role');
const { RequiresAuthenticateDirective } = require('./directives/authenticate');

const UserDBModel = require('./model/user');
const TeacherDBModel = require('./model/teacher');
const StudentDBModel = require('./model/student');
const ScheduleDBModel = require('./model/schedule');

const app = express();
const url = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_URL : process.env.MONGO_DEV_URL;

const dataSources = () => ({
    userAPI: new UserAPI(UserDBModel),
    studentAPI: new StudentAPI(StudentDBModel),
    teacherAPI: new TeacherAPI(TeacherDBModel),
    scheduleAPI: new ScheduleAPI(ScheduleDBModel),
});

app.use(cookieParser());

const server = new ApolloServer({
    introspection: true,
    playground: true,
    debug: true,
    schemaDirectives: {
        requiresRole: RequiresRoleDirective,
        requiresAuthenticate: RequiresAuthenticateDirective,
    },
    dataSources,
    typeDefs,
    resolvers,
    validationRules: [
        depthLimit(3),
    ],
    context: async ({ req, res }) => {
        let user = null;

        if (req && req.cookies) {
            const token = req.cookies.token;
            if (token) {
                const payload = auth.verifyToken(token);
                user = payload;
            }
        }

        return {
            res,
            user
        }
    }
});

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection connected');
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.set('useFindAndModify', false);

app.use(express.static('./assets'));
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`graphQL running at port 4000`);
});