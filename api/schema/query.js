module.exports = `
type Query {
    "list of users"
    users: [User]
    "list of teachers"
    teachers(teacher: TeacherInput): [Teacher]
    "list of students"
    students: [Student]
    "get teacher from the current user after them have logged in. requires a teacher role account"
    teacherByCurrentUser: Teacher @requiresRole(role: "TEACHER")
    "get student from the current user after them have logged in.  requires a student role account"
    studentByCurrentUser: Student @requiresRole(role: "STUDENT")
}
`;