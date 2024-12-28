export const typeDefs = `#graphql
    type User {
        id: String!
        firstName: String!
        lastName: String
        address: String
        email: String!
        phoneNo: String
        products: [Product!]!
        transactions: [Transaction!]!
    }

    type Product {
        id: String!
        title: String!
        categories: String
        description: String
        purchasePrice: Float
        rentPrice: Float
        rentTime: RentTime
        views: Int!
        ownerId: String!
        owner: User!
        transactions: [Transaction!]!
        createdAt: String!
        updatedAt: String!
    }

    type Transaction {
        id: String!
        product: Product!
        customer: User!
        transactionType: TransactionType!
        rentTimeFrom: String
        rentTimeTo: String
        createdAt: String!
    }

    enum RentTime {
        DAY
        WEEK
        MONTH
    }

    enum TransactionType {
        BUY
        RENT
    }

    type Query {
        # Get all products the user has sold
        getProductsSold(userId: String!): [Transaction!]!

        # Get all products the user has bought
        getProductsBought(userId: String!): [Transaction!]!

        # Get all products the user has lent out
        getProductsLent(userId: String!): [Transaction!]!

        # Get all products the user has borrowed
        getProductsBorrowed(userId: String!): [Transaction!]!
    }

    type Mutation {
        # Buy a product
        buyProduct(
            productId: String!,
            customerId: String!): Transaction!

        # Rent a product
        rentProduct(
            productId: String!,
            customerId: String!,
            rentTimeFrom: String!,
            rentTimeTo: String!): Transaction!
    }
`;
