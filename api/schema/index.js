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

module.exports = [User, Teacher, Student, Query, Mutation, Authentication, Directive, Enum, Scalar, Union];