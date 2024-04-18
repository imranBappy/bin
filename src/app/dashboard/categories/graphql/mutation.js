const { gql } = require("@apollo/client");

const CATEGORY_MUTATION = gql`
  mutation CATEGORY_MUTATION($input: CategoryInput!) {
    categorySubCategoryCreateUpdate(input: $input) {
      message
    }
  }
`;

export { CATEGORY_MUTATION };
