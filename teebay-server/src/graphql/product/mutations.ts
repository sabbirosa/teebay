export const mutations = `#graphql
    createProduct(
        title: String!, 
        categories: String!, 
        description: String!, 
        purchasePrice: Float!, 
        rentPrice: Float!, 
        rentTime: RentTime!,
        ownerId: String!,): Product
    
    editProduct(
        id: String!, 
        title: String, 
        categories: String, 
        description: String, 
        purchasePrice: Float, 
        rentPrice: Float, 
        rentTime: RentTime): Product
    
    deleteProduct(id: String!): Product
`;
