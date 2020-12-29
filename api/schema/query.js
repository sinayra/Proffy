module.exports = `
type Query {
    users: [User]
    teachers: [Teacher]
    students: [Student]
    teacherByCurrentUser: Teacher @requiresRole(role: "TEACHER")
    studentByCurrentUser: Student @requiresRole(role: "STUDENT")
}
`;