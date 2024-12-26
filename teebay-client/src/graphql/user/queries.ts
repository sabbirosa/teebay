import { gql } from "@apollo/client";

export const GET_CURRENT_LOGGED_IN_USER = gql`
  query getCurrentLoggedInUser {
    getCurrentLoggedInUser {
      id
      firstName
      lastName
      address
      email
      phoneNo
    }
  }
`;
