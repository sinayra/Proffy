module.exports = `
directive @requiresRole(role: String) on FIELD_DEFINITION
directive @requiresAuthenticate on FIELD_DEFINITION
`;