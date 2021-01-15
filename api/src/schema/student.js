module.exports = `

"Response with many Student data"
type StudentListResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  students: [Student]
}

"Response with a Student data"
type StudentResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  student: Student
}

type Student {
    _id: ID!
    "reference a previous user account that has been created"
    user: User! @requiresRole(role: "ADMIN")
    favorites: [Teacher]!
    connected: [Teacher]!
}
`;