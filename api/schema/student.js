module.exports = `

"Response with many Student data"
type StudentListResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  students: [Student]
  error: String
}

"Response with a Student data"
type StudentResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  student: Student
  error: String
}

type Student {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    favorites: [Teacher]!
    connected: [Teacher]!
}
`;