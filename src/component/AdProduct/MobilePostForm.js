"use client";
import { TextField, Grid } from "@/common";

const MobilePostForm = ({ formik }) => {
  return (
    <Grid
      item
      xs={12}
      sm={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <TextField
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="brand"
        name="brand"
        label="Brand"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
      />
      <TextField
        id="model"
        name="model"
        label="Model"
        type="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.model && Boolean(formik.errors.model)}
        helperText={formik.touched.model && formik.errors.model}
      />
      <TextField
        id="ram"
        name="ram"
        label="Ram"
        type="ram"
        value={formik.values.ram}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.ram && Boolean(formik.errors.ram)}
        helperText={formik.touched.ram && formik.errors.ram}
      />
      <TextField
        id="processor"
        name="processor"
        label="Processor"
        type="processor"
        value={formik.values.processor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.processor && Boolean(formik.errors.processor)}
        helperText={formik.touched.processor && formik.errors.processor}
      />
      <TextField
        id="processor"
        name="processor"
        label="Processor"
        type="processor"
        value={formik.values.processor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.processor && Boolean(formik.errors.processor)}
        helperText={formik.touched.processor && formik.errors.processor}
      />
      <TextField
        id="price"
        name="price"
        label="Price"
        type="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        type="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
    </Grid>
  );
};

export default MobilePostForm;
