import { Box, Container, Typography } from "@/common";
import { Card } from "@mui/material";

import CuOption from "./CuOption";

const page = () => {
  return (
    <Box my={8}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom py={2}>
          Add Option
        </Typography>

        <Card
          sx={{
            padding: "20px",
          }}
        >
          <CuOption />
        </Card>
      </Container>
    </Box>
  );
};

export default page;
