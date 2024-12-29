import { gql } from "@apollo/client";

export const GET_PRODUCTS_SOLD = gql`
  query GetProductsSold($userId: String!) {
    getProductsSold(userId: $userId) {
      id
      transactionType
      createdAt
      product {
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
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_PRODUCTS_BOUGHT = gql`
  query GetProductsBought($userId: String!) {
    getProductsBought(userId: $userId) {
      id
      transactionType
      createdAt
      product {
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
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_PRODUCTS_LENT = gql`
  query GetProductsLent($userId: String!) {
    getProductsLent(userId: $userId) {
      id
      transactionType
      createdAt
      product {
        id
        title
        description
        categories
        rentPrice
        rentTime
      }
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_PRODUCTS_BORROWED = gql`
  query GetProductsBorrowed($userId: String!) {
    getProductsBorrowed(userId: $userId) {
      id
      transactionType
      createdAt
      product {
        id
        title
        description
        categories
        rentPrice
        rentTime
      }
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
