require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const mongoose = require('mongoose');

const UserAPI = require('./datasource/user');
const StudentAPI = require('./datasource/student');
const TeacherAPI = require('./datasource/teacher');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserCollection = require('./model/user');
const TeacherCollection = require('./model/teacher');
const StudentCollection = require('./model/student');

const app = express();

const dataSources = () => ({
    userAPI: new UserAPI(UserCollection),
    studentAPI: new StudentAPI(StudentCollection),
    teacherAPI: new TeacherAPI(TeacherCollection)
});

const server = new ApolloServer({
    introspection: true,
    playground: true,
    debug: true,
    dataSources,
    typeDefs,
    resolvers,
});

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/${process.env.MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to localhost');
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

app.use(express.static('./assets')); 
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`graphQL running at port 4000`);
});