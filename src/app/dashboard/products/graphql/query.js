import { gql } from "@apollo/client";

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY(
    $first: Int
    $offset: Int
    $search: String
    $price: String
    $condition: String
    $name: String
    $orderBy: String
    $subDistrict: String
    $division: String
    $district: String
    $category: String
    $before: String
    $after: String
    $id: ID
    $last: Int
    $specification: [ID]
    $subCategory: String
    $isSeller: Boolean
  ) {
    products(
      first: $first
      offset: $offset
      search: $search
      price: $price
      condition: $condition
      name: $name
      orderBy: $orderBy
      subDistrict: $subDistrict
      division: $division
      district: $district
      category: $category
      before: $before
      after: $after
      id: $id
      last: $last
      specification: $specification
      subCategory: $subCategory
      isSeller: $isSeller
    ) {
      edges {
        node {
          id
          name
          price
          images
          quantity
          condition
          isActive
          description
          rawSpecification
          district {
            id
            name
          }
          subDistrict {
            id
            name
          }
          division {
            id
            name
          }
          category {
            id
            name
          }
          specification {
            edges {
              node {
                id
                name
              }
            }
          }
          createdAt
        }
      }
      totalCount
    }
  }
`;

// const PRODUCT_DETAILS_QUERY = gql`
//   query PRODUCT_QUERY($id: ID!) {
//     product(id: $id) {
//       condition
//       isActive
//       category {
//         id
//         name
//       }
//       subCategory {
//         id
//         name
//       }
//       division {
//         id
//         name
//       }
//       district {
//         id
//         name
//       }
//       subDistrict {
//         id
//         name
//       }
//       rawSpecification
//       name
//       price
//       description
//       images
//       isActive
//       quantity
//     }
//   }
// `;

// export { PRODUCT_DETAILS_QUERY };
export default PRODUCT_QUERY;
