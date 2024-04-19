const { gql } = require("@apollo/client");

export const SPECIFICATION_CATEGORORY_MUTATION = gql`
  mutation MyMutation(
    $userCanAdd: Boolean = true
    $options: [ID]!
    $name: String!
    $id: ID
    $category: ID!
  ) {
    specificationCategoryCreateUpdate(
      input: {
        category: $category
        id: $id
        userCanAdd: $userCanAdd
        options: $options
        name: $name
      }
    ) {
      message
    }
  }
`;

