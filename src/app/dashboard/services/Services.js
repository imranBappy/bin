"use client";

import { Container, Box } from "@/common";
import ServicesCard from "./ServicesCard";
import ComputerIcon from "@mui/icons-material/Computer";
import MessageIcon from "@mui/icons-material/Message";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

const Services = () => {
  
  return (
    <Container maxWidth={"xl"}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={{
          xs: 2,
          md: 4,
        }}
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        <ServicesCard
          title={"Laptop Finder"}
          description={"Find Your Laptop Easily"}
          Icon={InfoIcon}
        />
        <ServicesCard
          title={"Raise a Complain"}
          description={"Share your experience"}
          Icon={SettingsIcon}
        />
        <ServicesCard
          title={"Online Support"}
          description={"Get Online Support"}
          Icon={ComputerIcon}
        />

        <ServicesCard
          title={"Servicing Center"}
          description={"Repair Your Device"}
          Icon={MessageIcon}
        />
      </Box>
    </Container>
  );
};

export default Services;
