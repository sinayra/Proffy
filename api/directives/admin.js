const {
    SchemaDirectiveVisitor,
    AuthenticationError,
    ForbiddenError
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class AdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const context = args[2];
            const user = context.user;
            if (!user) {
                throw new AuthenticationError("You must login.");
            }
            if (user.role !== "ADMIN") {
                throw new ForbiddenError("You must be an admin.");
            }

            return resolve.apply(this, args);
        };
    }
}
exports.AuthDirective = AdminDirective;