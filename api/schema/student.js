module.exports = `
type Student {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    favorites: [Teacher]
    connected: [Teacher]
}
`;