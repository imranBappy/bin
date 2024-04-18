import { Box, Container, Typography } from "@/common";
import { Card } from "@mui/material";

import CuCategory from "./CuCategory";

const page = () => {
  return (
    <Box my={8}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom py={2}>
          Add Category
        </Typography>

        <Card
          sx={{
            padding: "20px",
          }}
        >
          <CuCategory />
        </Card>
      </Container>
    </Box>
  );
};

export default page;
