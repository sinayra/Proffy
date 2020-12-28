const {
    SchemaDirectiveVisitor,
    AuthenticationError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class RequiresAuthenticateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const context = args[2];
            const user = context.user;
            if (!user) {
                throw new AuthenticationError("You must login.");
            }
            
            return resolve.apply(this, args);
        };
    }
}
exports.RequiresAuthenticateDirective = RequiresAuthenticateDirective;