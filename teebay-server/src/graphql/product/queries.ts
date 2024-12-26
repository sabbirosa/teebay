export const queries = `#graphql
    getProduct(id: String!): Product
    getUserProducts(ownerId: String!): [Product]
    getAllProducts: [Product]
`;
