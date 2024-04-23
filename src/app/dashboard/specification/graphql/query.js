const { gql } = require("@apollo/client");

export const SPECIFICATIONS_CATEGORIES_QUERY = gql`
  query MyQuery(
    $offset: Int
    $id: ID
    $first: Int
    $orderBy: String
    $category: String
  ) {
    specificationCategories(
      offset: $offset
      id: $id
      first: $first
      orderBy: $orderBy
      category: $category
    ) {
      totalCount
      edges {
        node {
          name
          id
          createdAt
          options {
            totalCount
            edges {
              node {
                id
                name
              }
            }
          }
          category {
            name
            image
            id
          }
        }
      }
    }
  }
`;

export const SPECIFICATIONS_CATEGORY_QUERY = gql`
  query MyQuery($first: Int, $offset: Int) {
    specifications(first: $first, offset: $offset) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
    }
    category(id: "4") {
      subCategories {
        totalCount
        edges {
          node {
            id
            image
            name
          }
        }
      }
    }
  }
`;
