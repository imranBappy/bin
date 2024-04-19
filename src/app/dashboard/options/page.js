import React from "react";
import { Box, Button, Container, Typography } from "@/common";
import OptionsTable from "./OptionsTable";
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
            Options
          </Typography>
          <Link href="/dashboard/options/add">
            <Button color="primary" style={{ marginTop: "20px" }}>
              Add Option
            </Button>
          </Link>
        </Box>
        <Box>
          <OptionsTable />
        </Box>
      </Container>
    </Box>
  );
};

export default page;
