module.exports = `
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