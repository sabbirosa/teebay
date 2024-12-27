import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $categories: String!
    $description: String!
    $purchasePrice: Float!
    $rentPrice: Float!
    $rentTime: RentTime!
    $ownerId: String!
  ) {
    addProduct(
      title: $title
      categories: $categories
      description: $description
      purchasePrice: $purchasePrice
      rentPrice: $rentPrice
      rentTime: $rentTime
      ownerId: $ownerId
    ) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentTime
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: String!
    $title: String
    $categories: String
    $description: String
    $purchasePrice: Float
    $rentPrice: Float
    $rentTime: RentTime
  ) {
    editProduct(
      id: $id
      title: $title
      categories: $categories
      description: $description
      purchasePrice: $purchasePrice
      rentPrice: $rentPrice
      rentTime: $rentTime
    ) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentTime
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const INCREMENT_VIEWS = gql`
  mutation IncrementViews($id: String!) {
    incrementViews(id: $id) {
      id
      views
    }
  }
`;
