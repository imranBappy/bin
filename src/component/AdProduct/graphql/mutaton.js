import { gql } from "@apollo/client";

const PRODUCT_MUTATION = gql`
  mutation PRODUCT_MUTATION(
    $condition: String!
    $category: ID!
    $description: String!
    $district: ID!
    $division: ID!
    $id: ID
    $images: String!
    $quantity: Int!
    $name: String!
    $price: Decimal!
    $specifications: [SpecificationInput]
    $isActive: Boolean
  ) {
    productCreateUpdate(
      input: {
        condition: $condition
        name: $name
        price: $price
        description: $description
        images: $images
        category: $category
        district: $district
        division: $division
        id: $id
        quantity: $quantity
        isActive: $isActive
      }
      specifications: $specifications
    ) {
      message
    }
  }
`;

export { PRODUCT_MUTATION };
