const { gql } = require("@apollo/client");

const OPTION_MUTATION = gql`
  mutation MyMutation($input: SpecificationInput!) {
    specificationCreateUpdate(input: $input) {
      message
    }
  }
`;

export { OPTION_MUTATION  };
