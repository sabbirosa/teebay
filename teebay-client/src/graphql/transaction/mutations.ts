import { gql } from "@apollo/client";

export const BUY_PRODUCT_TRANSACTION = gql`
  mutation BuyProduct($productId: String!, $customerId: String!) {
    buyProduct(productId: $productId, customerId: $customerId) {
      id
      product {
        id
        title
      }
      customer {
        id
        email
      }
      transactionType
      createdAt
    }
  }
`;

export const RENT_PRODUCT_TRANSACTION = gql`
  mutation RentProduct(
    $productId: String!
    $customerId: String!
    $rentTimeFrom: String!
    $rentTimeTo: String!
  ) {
    rentProduct(
      productId: $productId
      customerId: $customerId
      rentTimeFrom: $rentTimeFrom
      rentTimeTo: $rentTimeTo
    ) {
      id
      product {
        id
        title
      }
      customer {
        id
        email
      }
      transactionType
      rentTimeFrom
      rentTimeTo
      createdAt
    }
  }
`;
