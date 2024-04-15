"use client";
import { useIntl } from "react-intl";

import { Container, Box } from "@/common";
import ServicesCard from "./ServicesCard";
import ComputerIcon from "@mui/icons-material/Computer";
import MessageIcon from "@mui/icons-material/Message";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

const Services = () => {
  const intl = useIntl();
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
          title={intl.formatMessage({ id: "homepage_header_service1_title" })}
          description={intl.formatMessage({
            id: "homepage_header_service1_subtitle",
          })}
          Icon={ComputerIcon}
        />
        <ServicesCard
          title={intl.formatMessage({ id: "homepage_header_service2_title" })}
          description={intl.formatMessage({
            id: "homepage_header_service2_subtitle",
          })}
          Icon={MessageIcon}
        />
        <ServicesCard
          title={intl.formatMessage({ id: "homepage_header_service3_title" })}
          description={intl.formatMessage({
            id: "homepage_header_service3_subtitle",
          })}
          Icon={InfoIcon}
        />
        <ServicesCard
          title={intl.formatMessage({ id: "homepage_header_service4_title" })}
          description={intl.formatMessage({
            id: "homepage_header_service4_subtitle",
          })}
          Icon={SettingsIcon}
        />
      </Box>
    </Container>
  );
};

export default Services;
