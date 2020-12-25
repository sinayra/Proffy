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
    "return a list of users that its role is TEACHER"
    teachers: [Teacher]
  }

  type Mutation {
    """
      Add a user in database. 
      Based on his role, add also a student or a teacher. Use '...on Student' or '...on Teacher' to get results from this mutation
    """
    addUser(user: UserInput): TeacherOrStudent
  }

  """
  A type that describes the new user. This type should contain all information that an user can provides to create an account
  """
  input UserInput {
    name: String!
    email: String!
    hash: String!
    whatsapp: String
    avatar: String
    role: Role!
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
    favorite: [Teacher]
    connected: [Teacher]
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