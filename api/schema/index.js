const { gql } = require('apollo-server');

module.exports = gql`
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
  }

  type Mutation {
    signup(account: SigninInput): AuthPayload
    logout: AuthPayload
    login(account: LoginInput): AuthPayload
  }

  """
  An input that describes a new account. This input should contain all information that a client can provides to create an account
  """
  input SigninInput {
    name: String!
    email: String!
    password: String!
    whatsapp: String
    avatar: String
    role: Role!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  """
  This type contains all commons fields from teacher and student
  """
  type User {
    _id: ID!
    name: String!
    email: String!
    "This is user password after being hash"
    hash: String!
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