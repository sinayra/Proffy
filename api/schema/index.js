const { gql } = require('apollo-server');

module.exports = gql`
  directive @requiresRole(role: String) on FIELD_DEFINITION
  directive @requiresAuthenticate on FIELD_DEFINITION

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
    studentByCurrentUser: Student @requiresRole(role: "STUDENT")
  }

  type Mutation {
    signup(account: SignupInput!): AuthPayload
    logout: AuthPayload
    login(account: LoginInput!): AuthPayload
    updateUser(userInput: UserInput!): User @requiresAuthenticate
    updateTeacher(teacherInput: TeacherInput!): Teacher
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
  An input with the required fields to authenticate
  """
  input LoginInput {
    email: String!
    password: String!
  }

  """
  An input with all optional fields from Teacher
  """
  input TeacherInput {
    _id: ID
    bio: String
    price: String
    area: [Area!]
    day: [Weekday!]
  }

  """
  An input to update fields from User
  """
  input UserInput {
    _id: ID
    name: String
    password: String
    whatsapp: String
    avatar: String
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
    active: Boolean
  }

  type Teacher {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    bio: String
    price: String
    area: [Area]
    day: [Weekday]
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
    COMPUTER_SCIENCE
    MATHEMATICS
    PHYSICS
    PHYSICAL_EDUCATION
    ECONOMIC_SCIENCES
  }

  enum Weekday {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

`;