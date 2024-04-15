import React from "react";
import { Box } from "@/common";
import Loader from "@/component/Loader/Loader";

const loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </Box>
  );
};

export default loading;
