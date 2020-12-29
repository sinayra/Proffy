module.exports = `
type Mutation {
    signup(account: SignupInput!): AuthPayload
    logout: AuthPayload
    login(account: LoginInput!): AuthPayload
    updateUser(userInput: UserInput!): User @requiresAuthenticate
    updateTeacher(teacherInput: TeacherInput!): Teacher @requiresRole(role: "TEACHER")
    toogleFavoriteTeacher(teacherId: ID!, studentId: ID): Student @requiresRole(role: "STUDENT")
    addTeacherStudentConnection(teacherId: ID!, studentId: ID): Student @requiresRole(role: "STUDENT")
}
`