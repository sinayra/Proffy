module.exports = `
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

"Response after login, logout and signin"
type AuthPayload {
  user: User
}
`;