module.exports = `

interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }


type Mutation {
    "Create a new account. Must not have token cookie"
    signup(account: SignupInput!): AuthResponse
    "Clear cookie and set user context to null"
    logout: AuthResponse
    "Check if user exists and creates a token access"
    login(account: LoginInput!): AuthResponse
    "Update not mandatory fields from user"
    updateUser(userInput: UserInput!): UserResponse @requiresAuthenticate
    "Update not mandatory fields from teacher"
    updateTeacher(teacherInput: TeacherInput!): TeacherResponse @requiresRole(role: "TEACHER")
    "Add/remove teacher to favorites"
    toogleFavoriteTeacher(teacherId: ID!, studentId: ID): StudentResponse @requiresRole(role: "STUDENT")
    "Add teacher to student connections"
    addTeacherStudentConnection(teacherId: ID!, studentId: ID): StudentResponse @requiresRole(role: "STUDENT")
}
`