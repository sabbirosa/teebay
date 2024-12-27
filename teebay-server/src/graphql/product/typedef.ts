export const typeDefs = `#graphql
    enum RentTime {
        DAY
        WEEK
        MONTH
    }

    type Product {
        id: String!
        title: String!
        categories: String!
        description: String!
        purchasePrice: Float!
        rentPrice: Float!
        rentTime: RentTime!
        ownerId: String!
        views: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getProduct(id: String!): Product
        getUserProducts(ownerId: String!): [Product]
        getAllProducts: [Product]
    }

    type Mutation {
        addProduct(
            title: String!, 
            categories: String!,
            description: String!, 
            purchasePrice: Float!,
            rentPrice: Float!,
            rentTime: RentTime!,
            ownerId: String!
        ): Product
        
        editProduct(
            id: String!, 
            title: String, 
            categories: String, 
            description: String, 
            purchasePrice: Float,
            rentPrice: Float,
            rentTime: RentTime
        ): Product
        
        deleteProduct(id: String!): Product

        incrementViews(id: String!): Product
    }
`;
