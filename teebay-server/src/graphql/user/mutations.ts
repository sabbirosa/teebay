export const mutations = `#graphql
    registerUser(
        firstName: String!,
        lastName: String,
        address: String,
        email: String!,
        phoneNo: String,
        password: String!
    ): String

    loginUser(email: String!, password: String!): String
`;
