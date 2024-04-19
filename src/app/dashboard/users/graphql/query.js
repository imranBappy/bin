import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query USERS_QUERY(
    $first: Int
    $before: String
    $isActive: Boolean
    $offset: Int
    $sellerStatus: String
    $email: String
  ) {
    users(
      first: $first
      before: $before
      offset: $offset
      isActive: $isActive
      sellerStatus: $sellerStatus
      email: $email
    ) {
      totalCount
      edges {
        node {
          id
          name
          email
          phone
          profilePic
          isActive
          sellerStatus
          division {
            id
            name
          }
          district {
            id
            name
          }
          subDistrict {
            id
            name
          }
        }
      }
    }
  }
`;

export const USER_QUERY = gql`
  query USERS_QUERY($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      profilePic
      address
      zipCode
      isActive
      sellerStatus
      division {
        id
        name
      }
      district {
        id
        name
      }
      subDistrict {
        id
        name
      }
    }
  }
`;
