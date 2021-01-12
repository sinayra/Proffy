const { GraphQLScalarType, Kind } = require('graphql');

function valueInRange(min, max, value) {
    return value >= min && value <= max ? value : null;
}

module.exports = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),

    Time: new GraphQLScalarType({
        name: 'Time',
        description: 'Time in minutes',
        parseValue: (value) => valueInRange(0, 1439, value),
        serialize: (value) => valueInRange(0, 1439, value),
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),

    Weekday: new GraphQLScalarType({
        name: 'Weekday',
        description: 'Weekday from Sunday (0) to Saturday (6)',
        parseValue: (value) => valueInRange(0, 6, value),
        serialize: (value) => valueInRange(0, 6, value),
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
}