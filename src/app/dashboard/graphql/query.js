import { gql } from "@apollo/client";

export const DASHBOARD_QUERY = gql`
  query MyQuery($isSeller: Boolean = false) {
    salesDashboard(isSeller: $isSeller)
  }
`;
export const SELLER_DASHBOARD_QUERY = gql`
  query MyQuery($isSeller: Boolean = false) {
    salesDashboard(isSeller: $isSeller)
    products(first: 6) {
      edges {
        node {
          id
          images
          name
          createdAt
        }
      }
    }
    orders(first: 6) {
      edges {
        node {
          totalAmount
          fullName
          id
          createdAt
        }
      }
    }
  }
`;
