import { gql } from "@apollo/client";

const ALL_BANNER_AND_ADS_QUERY = gql`
  query AllBannerAndAds($isAds: Boolean, $isActive: Boolean) {
    allBannersOrAds(isAds: $isAds, isActive: $isActive, orderBy: "createdAt") {
      edges {
        node {
          id
          altText
          link
        }
      }
    }
  }
`;

export { ALL_BANNER_AND_ADS_QUERY };
