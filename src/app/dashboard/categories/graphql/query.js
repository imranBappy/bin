const { gql } = require("@apollo/client");

export const CATEGORY_QUERY = gql`
  query CATEGORY_QUERY($id: ID) {
    category(id: "4") {
      subCategories(id: $id) {
        edges {
          node {
            id
            name
            image
            products {
              totalCount
            }
          }
        }
      }
    }
  }
`;
