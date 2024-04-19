import React from "react";
import { Box, Button, Container, Typography } from "@/common";
import SpecificationsTable from "./SpecificationsTable";
import Link from "next/link";

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
            Specification
          </Typography>
          <Link href="/dashboard/specification/add">
            <Button color="primary" style={{ marginTop: "20px" }}>
              Add Specification
            </Button>
          </Link>
        </Box>
        <Box>
          <SpecificationsTable />
        </Box>
      </Container>
    </Box>
  );
};

export default page;
