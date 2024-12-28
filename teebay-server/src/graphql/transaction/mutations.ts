export const mutations = `#graphql
    buyProduct(
        productId: String!,
        customerId: String!): Transaction!

    rentProduct(
        productId: String!
        customerId: String!
        rentTimeFrom: String!
        rentTimeTo: String!): Transaction!
`;
