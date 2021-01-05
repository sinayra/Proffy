module.exports = `

"Response with many User data"
type UserListResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  users: [User]
}

"Response with a User data"
type UserResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  user: User
  error: String
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
`;