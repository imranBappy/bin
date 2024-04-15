import React from "react";
import { Box, Button, Container, TextField, Typography } from "@/common";
import { Input } from "@mui/icons-material";

const page = () => {
  return (
    <Box my={8}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Add Services
        </Typography>
        <Box>
          {/* Add your code here */}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "center",
              gap: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Service Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Service Description"
              variant="outlined"
            />

            <Button variant="contained" color="primary">
              Add Service
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default page;
