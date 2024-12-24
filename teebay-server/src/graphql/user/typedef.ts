export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        email: String!
        phoneNo: String
        token: String
    }

    type Query {
        loginUser(email: String!, password: String!): String
    }

    type Mutation {
        registerUser(
            firstName: String!,
            lastName: String!,
            address: String!,
            email: String!,
            phoneNo: String!,
            password: String!
        ): String
    }
`;
