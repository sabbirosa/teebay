export const queries = `#graphql
    getProductsSold(userId: String!): [Transaction!]!
    getProductsBought(userId: String!): [Transaction!]!
    getProductsLent(userId: String!): [Transaction!]!
    getProductsBorrowed(userId: String!): [Transaction!]!
`;
