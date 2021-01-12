const {
    SchemaDirectiveVisitor,
    AuthenticationError,
    ForbiddenError
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class RequiresRoleDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field;
        const { role } = this.args;
        field.resolve = async function (...args) {
            const context = args[2];
            const user = context.user;
            if (!user) {
                throw new AuthenticationError("You must login.");
            }
            if (user.role !== "ADMIN" && user.role !== role) {
                throw new ForbiddenError("Only authorized accounts.");
            }

            return resolve.apply(this, args);
        };
    }
}
exports.RequiresRoleDirective = RequiresRoleDirective;