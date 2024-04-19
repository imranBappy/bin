const { gql } = require("@apollo/client");

export const SPECIFICATIONS_QUERY = gql`
  query SPECIFICATION_QUERY($offset: Int, $first: Int) {
    specifications(offset: $offset, first: $first) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const OPTION_QUERY = gql`
  query MyQuery($id: ID!) {
    specification(id: $id) {
      id
      name
    }
  }
`;
