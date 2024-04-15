"use client";

import React, { useContext } from "react";
import { Box, Container, Typography } from "@/common";
import SellerDashboard from "@/component/Dashboard/SellerDashboard";

const DashboardPage = ({ params }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box>
          <Typography variant="h3" color="primary">
            Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome to the dashboard
          </Typography>
        </Box>
        <SellerDashboard lang={params.locale} />
      </Container>
    </Box>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "en" } }, { params: { locale: "bn" } }],
    fallback: false,
  };
}

export default DashboardPage;
