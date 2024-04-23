const { gql } = require("@apollo/client");

const OPTION_MUTATION = gql`
  mutation MyMutation($input: AdminSpecificationInput!) {
    specificationCreateUpdate(input: $input) {
      message
    }
  }
`;

export { OPTION_MUTATION  };
