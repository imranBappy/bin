"use client";
import { Container, Box } from "@/common";
import ProfileView from "./ProfileVIew";
import UserProducts from "./UserProducts";

const UserDetails = ({ params }) => {
  return (
    <Box my={8}>
      <Container maxWidth="xl">
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <ProfileView params={params} />
          {/* <UserProducts /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default UserDetails;
