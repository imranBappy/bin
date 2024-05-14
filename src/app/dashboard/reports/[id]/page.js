"use client";
import { Box } from "@mui/material";
import { Container } from "@/common";
import Report from "./Report";
const page = ({ params }) => {
  return (
    <Box my={8}>
      <Container>
        <Report params={params} />
      </Container>
    </Box>
  );
};

export default page;
