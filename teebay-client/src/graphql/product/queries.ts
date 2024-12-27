import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getAllProducts {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentTime
      ownerId
      views
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentTime
      views
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS_BY_OWNER = gql`
  query GetProductsByOwner($ownerId: String!) {
    getUserProducts(ownerId: $ownerId) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentTime
      views
      ownerId
      createdAt
      updatedAt
    }
  }
`;
