"use client";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@/common";
import { getDistrict, getDivision, getSubDistrict } from "@/utils/getAddress";

const ProfileUpdateForm = ({ formik, handleActive, isActive }) => {
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
              disabled
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              disabled
            />
            <Autocomplete
              getOptionLabel={(option) => option.label} // new added
              value={{
                label: formik.values?.division?.label,
                id: formik.values?.division?.id,
              }}
              id="division"
              name="division"
              label={"Division"}
              options={getDivision() || []}
              onChange={(e, newValue) =>
                formik.setFieldValue("division", newValue)
              }
              error={formik.touched.division && Boolean(formik.errors.division)}
              helperText={formik.touched.division && formik.errors.division}
              sx={{ width: "100%" }}
              disabled
            />
          </Box>
          <Box display="flex" gap={2}>
            <Autocomplete
              getOptionLabel={(option) => option.label} // new added
              value={formik.values.district}
              id="district"
              name="district"
              label={"District"}
              options={getDistrict(formik.values?.division?.id) || []}
              onChange={(e, newValue) =>
                formik.setFieldValue("district", newValue)
              }
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
              sx={{ width: "100%" }}
              disabled
            />
            <Autocomplete
              getOptionLabel={(option) => option.label} // new added
              value={formik.values.subDistrict}
              id="subDistrict"
              name="subDistrict"
              label={"Sub District"}
              options={
                getSubDistrict(
                  formik.values?.division?.id,
                  formik.values?.district?.id
                ) || []
              }
              onChange={(e, newValue) =>
                formik.setFieldValue("subDistrict", newValue)
              }
              error={
                formik.touched.subDistrict && Boolean(formik.errors.subDistrict)
              }
              helperText={
                formik.touched.subDistrict && formik.errors.subDistrict
              }
              disabled
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
              disabled
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
              disabled
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color={isActive ? "success" : "error"}
              onClick={handleActive}
            >
              Make Active
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileUpdateForm;
