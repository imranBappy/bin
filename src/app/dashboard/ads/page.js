"use client";

import React from "react";
import { Box, Container, Typography } from "@/common";
import { useQuery } from "@apollo/client";
import { ALL_BANNER_AND_ADS_QUERY } from "../slider/graphql/query";
import AdCard from "./AdCard";
const Ads = () => {
  const { data, refetch } = useQuery(ALL_BANNER_AND_ADS_QUERY, {
    variables: { isAds: true, isActive: true },
  });

  return (
    <Box my={8}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Ads
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <AdCard
            refetch={refetch}
            link={data?.allBannersOrAds?.edges[0]?.node?.link}
            id={data?.allBannersOrAds?.edges[0]?.node?.id}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Ads;
