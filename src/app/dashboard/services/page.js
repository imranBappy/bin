import React from "react";
import { Box, Button, Container, Typography } from "@/common";
import Services from "./Services";

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
            Services
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/dashboard/services/add"
            style={{ marginTop: "20px" }}
          >
            Add Service
          </Button>
        </Box>
        <Box>
          <Services />
        </Box>
      </Container>
    </Box>
  );
};

export default page;
