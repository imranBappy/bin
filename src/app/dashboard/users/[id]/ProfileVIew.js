"use client";
import { Box, Grid } from "@/common";

import { useFormik } from "formik";
import ProfileCard from "./ProfileCard";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { USER_QUERY } from "../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { VERIFY_USER_MUTATION } from "../graphql/mutation";

const ProfileView = ({ params }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      subDistrict: "",
      zipCode: "",
      profileImage: "",
    },
  });
  const { data, loading, refetch } = useQuery(USER_QUERY, {
    variables: { id: params?.id },
    onCompleted: (data) => {
      const user = data?.user;

      formik.setValues({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        division: {
          label: user?.division?.name,
          id: user?.division?.id,
        },
        district: {
          label: user?.district?.name,
          id: user?.district?.id,
        },
        subDistrict: {
          label: user?.subDistrict?.name,
          id: user?.subDistrict?.id,
        },
        zipCode: user?.zipCode,
        profileImage: user?.profilePic,
      });
    },
  });
  const [verify, { loading: loadingverify }] = useMutation(
    VERIFY_USER_MUTATION,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const handleVerify = () => {
    verify({
      variables: {
        action: true,
        actionFor: "seller",
        userId: params?.id,
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" mt={7}>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <ProfileCard
          verify={handleVerify}
          loadingverify={loadingverify}
          name={formik.values.name}
          email={formik.values.email}
          phone={formik.values.phone}
          profileImage={formik.values.profileImage}
          sellerStatus={data?.user?.sellerStatus}
        />
        <ProfileUpdateForm formik={formik} loading={loading} params={params} />
      </Grid>
    </Box>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "en" } }, { params: { locale: "bn" } }],
    fallback: false,
  };
}
export default ProfileView;
