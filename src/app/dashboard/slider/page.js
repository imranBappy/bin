"use client";

import React from "react";
import { Box, Container, Typography } from "@/common";

import { useQuery } from "@apollo/client";
import { ALL_BANNER_AND_ADS_QUERY } from "./graphql/query";
import Slide from "./Slide";

const Slider = () => {
  const { data, refetch } = useQuery(ALL_BANNER_AND_ADS_QUERY, {
    variables: { isAds: false, isActive: true },
  });
  return (
    <Box my={8}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Slider
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Slide
            refetch={refetch}
            link={data?.allBannersOrAds?.edges[0]?.node?.link}
            id={data?.allBannersOrAds?.edges[0]?.node?.id}
          />
          <Slide
            refetch={refetch}
            link={data?.allBannersOrAds?.edges[1]?.node?.link}
            id={data?.allBannersOrAds?.edges[1]?.node?.id}
          />
          <Slide
            refetch={refetch}
            link={data?.allBannersOrAds?.edges[2]?.node?.link}
            id={data?.allBannersOrAds?.edges[2]?.node?.id}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Slider;
