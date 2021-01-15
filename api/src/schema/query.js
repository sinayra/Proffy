module.exports = `
type Query {
    "list of users"
    users: UserListResponse
    "list of teachers"
    teachers(teacher: TeacherInput): TeacherListResponse
    "list of students"
    students: StudentListResponse 
    "Get logged user information"
    currentUser: UserResponse
    "get teacher from the current user after them have logged in. Requires a teacher role account"
    teacherByCurrentUser: TeacherResponse @requiresRole(role: "TEACHER")
    "get student from the current user after them have logged in. Requires a student role account"
    studentByCurrentUser: StudentResponse @requiresRole(role: "STUDENT")
}
`;