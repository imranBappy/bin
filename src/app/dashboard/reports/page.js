import React from "react";
import { Box, Container, Typography } from "@/common";
import ReportsTable from "./ReportsTable";

const page = () => {
  return (
    <Box my={8}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
        </Box>
        <Box>
          <ReportsTable />
        </Box>
      </Container>
    </Box>
  );
};

export default page;
