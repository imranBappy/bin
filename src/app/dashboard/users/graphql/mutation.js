
import { gql } from '@apollo/client';

export const VERIFY_USER_MUTATION = gql`
  mutation VERIFY_USER_MUTATION(
    $userId: ID!
    $action: Boolean!
    $actionFor: String!
  ) {
    userActiveInactiveSellerVerifiy(
      userId: $userId
      action: $action
      actionFor: $actionFor
    ) {
      message
    }
  }
`;