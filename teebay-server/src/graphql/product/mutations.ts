export const mutations = `#graphql
    addProduct(
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

    incrementViews(id: String!): Product
`;
