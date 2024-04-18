import React from "react";
import { Box, Button, Container, Typography } from "@/common";
import Categories from "./Categories";

const page = () => {
  return (
    <Box my={8}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/dashboard/categories/add"
            style={{ marginTop: "20px" }}
          >
            Add Category
          </Button>
        </Box>
        <Box>
          <Categories />
        </Box>
      </Container>
    </Box>
  );
};

export default page;
