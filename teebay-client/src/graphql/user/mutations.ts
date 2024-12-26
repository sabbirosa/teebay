import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    registerUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
