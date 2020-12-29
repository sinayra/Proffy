module.exports = `
type Query {
    users: [User]
    teachers(teacher: TeacherInput): [Teacher]
    students: [Student]
    teacherByCurrentUser: Teacher @requiresRole(role: "TEACHER")
    studentByCurrentUser: Student @requiresRole(role: "STUDENT")
}
`;