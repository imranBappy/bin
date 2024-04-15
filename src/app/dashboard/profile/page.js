"use client";
import { Box, Container, Grid } from "@/common";

import ProfileCard from "./ProfileCard";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { useFormik } from "formik";

const ProfilePage = () => {
  const formik = useFormik({
    initialValues: {
      name: "John Doe",
      email: "john@email.com",
      phone: "",
      address: "",
      district: "",
      subDistrict: "",
      zipCode: "",
      profileImage: "",
    },
  });



  return (
    <Container maxWidth="xl">
      <Box display="flex" flexDirection="column" mt={7}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <ProfileCard
            name={formik.values.name}
            email={formik.values.email}
            phone={formik.values.phone}
            profileImage={formik.values.profileImage}
          />
          <ProfileUpdateForm />
        </Grid>
      </Box>
    </Container>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "en" } }, { params: { locale: "bn" } }],
    fallback: false,
  };
}
export default ProfilePage;
