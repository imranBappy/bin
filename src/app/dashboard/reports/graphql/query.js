const { gql } = require("@apollo/client");

export const REPORTS_QUERY = gql`
  query MyQuery(
    $first: Int
    $offset: Int
    $status: String
    $reportType: ID
    $reportedBy: ID
    $orderBy: String
    $product: ID
    $last: Int
    $investigationNote: String
    $investigatedBy: ID
    $details: String
    $createdAt: DateTime
    $before: String
    $after: String
  ) {
    productReports(
      offset: $offset
      first: $first
      status: $status
      reportType: $reportType
      reportedBy: $reportedBy
      orderBy: $orderBy
      product: $product
      last: $last
      investigationNote: $investigationNote
      investigatedBy: $investigatedBy
      details: $details
      createdAt: $createdAt
      before: $before
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          details
          createdAt
          status
          product {
            name
            id
          }

          reportType {
            id
            title
          }
        }
      }
    }
  }
`;

export const REPORT_QUERY = gql`
  query MyQuery($id: ID!) {
    productReport(id: $id) {
      createdAt
      details
      id
      investigationNote
      status
      updatedAt
      product {
        id
        name
      }
    }
  }
`;
