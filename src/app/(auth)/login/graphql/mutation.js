const { gql } = require("@apollo/client");

const LOGIN = gql`
  mutation ADMIN_MUTATION($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      accessToken
    }
  }
`;

module.exports = {
  LOGIN,
};
