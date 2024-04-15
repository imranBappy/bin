"use client";

import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@/common";
import { bangladeshDistricts } from "@/data/location";
import { useFormik } from "formik";
import getUpazilas from "@/utils/getUpazilas";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  phone: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  zipCode: Yup.number().required("Required"),
});

const ProfileUpdateForm = () => {
  const initialValues = {
    name: "John",
    email: "",
    phone: "",
    district: "Gopalganj",
    city: "Kashiani",
    address: "",
    zipCode: "",
  };

  const handleSubmit = (values) => {};

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
      <Box
        boxShadow={2}
        p={3}
        sx={{
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          textAlign={"left"}
          sx={{
            paddingBottom: "10px",
            marginBottom: "10px",
            width: "100%",
          }}
          borderBottom={1}
          borderColor={"border.primary"}
        >
          My Profile Details
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box display="flex" gap={2}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          <Box display="flex" gap={2}>
            <Autocomplete
              id="district"
              name="district"
              label={"District"}
              options={bangladeshDistricts}
              onChange={(e, newValue) =>
                formik.setFieldValue("district", newValue?.label || null)
              }
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
              defaultValue={formik.values.district}
              value={formik.values.district}
              sx={{ width: "100%" }}
            />
            <Autocomplete
              id="city"
              name="city"
              label={"City"}
              options={getUpazilas(formik.values.district) || []}
              onChange={(e, newValue) =>
                formik.setFieldValue("city", newValue?.label || null)
              }
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled={!formik.values.district}
              defaultValue={formik.values.city}
              value={formik.values.city}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileUpdateForm;
