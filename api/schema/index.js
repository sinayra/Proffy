const User = require('./user');
const Teacher = require('./teacher');
const Student = require('./student');
const Query = require('./query');
const Mutation = require('./mutation');
const Authentication = require('./authentication');
const Directive = require('./directive');
const Enum = require('./enum');
const Scalar = require('./scalar');
const Union = require('./union');
const Schedule = require('./schedule');

module.exports = [
    User, 
    Teacher,
    Schedule,
    Student, 
    Authentication, 
    Directive, 
    Query, 
    Mutation, 
    Enum, 
    Scalar, 
    Union, 
];