import { gql } from "@apollo/client";
const BANNER_ADD_MUTATION = gql`
  mutation BANNER_ADD_MUTATION($input: BannerOrAdsInput!) {
    bannerOrAdsCreateUpdate(input: $input) {
      message
    }
  }
`;
export default BANNER_ADD_MUTATION;
