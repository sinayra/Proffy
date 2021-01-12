module.exports = `
"after adding a new user, the mutation 'addUser' can return a teacher or a student "
union TeacherOrStudent = Teacher | Student
`;