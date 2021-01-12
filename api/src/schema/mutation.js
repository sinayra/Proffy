module.exports = `

interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }


type Mutation {
    signup(account: SignupInput!): AuthResponse
    logout: AuthResponse
    login(account: LoginInput!): AuthResponse
    updateUser(userInput: UserInput!): UserResponse @requiresAuthenticate
    updateTeacher(teacherInput: TeacherInput!): TeacherResponse @requiresRole(role: "TEACHER")
    toogleFavoriteTeacher(teacherId: ID!, studentId: ID): StudentResponse @requiresRole(role: "STUDENT")
    addTeacherStudentConnection(teacherId: ID!, studentId: ID): StudentResponse @requiresRole(role: "STUDENT")
}
`