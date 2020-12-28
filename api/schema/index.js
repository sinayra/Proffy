const { gql } = require('apollo-server');

module.exports = gql`
  directive @requiresRole(role: String) on FIELD_DEFINITION

  "Date in milliseconds"
  scalar Date

  type Query {
    """
      Return a list of users.

      This should require admin in the future.
    """
    users: [User]
    "return a list of teachers"
    teachers: [Teacher]
    students: [Student]
    teacherByCurrentUser: Teacher @requiresRole(role: "TEACHER")
    #studentByUser(user: User): Student
  }

  type Mutation {
    signup(account: SignupInput!): AuthPayload
    logout: AuthPayload
    login(account: LoginInput!): AuthPayload
    #updateTeacher(teacher: TeacherInput!)
    #addFavoriteTeacher(teacherId: ID!)
    #removeFavoriteTeacher(teacherId: ID!)
    #addTeacherStudentConnection(teacherId: ID!)
  }

  """
  An input that describes a new account. This input should contain all information that a client can provides to create an account
  """
  input SignupInput {
    name: String!
    email: String!
    password: String!
    whatsapp: String
    avatar: String
    role: Role!
  }

  """
  An input that describes an existing account. 
  """
  input LoginInput {
    email: String!
    password: String!
  }

  """
  An input with all optional fields from Teacher
  """
  input TeacherInput {
    bio: String
    price: String
    area: [Area]
    day: [Date]
  }

  """
  This type contains all commons fields from teacher and student
  """
  type User {
    _id: ID!
    name: String!
    email: String!
    "Hash field is the user's password after being hashed. Requires admin account."
    hash: String! @requiresRole(role: "ADMIN")
    whatsapp: String
    avatar: String
    role: Role!
  }

  type Teacher {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    bio: String
    price: String
    area: [Area]
    day: [Date]
    subject: String @deprecated(
      reason: "A teacher can have more than one subject that he can teach, so this field will be remove soon. Use 'area' instead."
      )
  }

  type Student {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    favorites: [Teacher]
    connected: [Teacher]
  }

  "Response after login, logout and signin"
  type AuthPayload {
    user: User
  }

  "after adding a new user, the mutation 'addUser' can return a teacher or a student "
  union TeacherOrStudent = Teacher | Student

  "Possible accounts types"
  enum Role {
    ADMIN
    TEACHER
    STUDENT
  }

"Teacher accepted study's fields"
  enum Area {
    BIOLOGY
    CHEMISTRY
    ENGLISH
    GEOGRAPHY
    HISTORY
    COMPUTER SCIENCE
    MATHEMATICS
    PHYSICS
    PHYSICAL EDUCATION
    ECONOMIC SCIENCES
  }

`;