"use client";
import { TextField, Grid, Autocomplete } from "@/common";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/common/TextEditor"), {
  ssr: false,
});

const brandList = [
  {
    id: 1,
    label: "Apple",
    value: "apple",
  },
  {
    id: 2,
    label: "Dell",
    value: "dell",
  },
  {
    id: 3,
    label: "HP",
    value: "hp",
  },
  {
    id: 4,
    label: "Lenovo",
    value: "lenovo",
  },
  {
    id: 5,
    label: "Acer",
    value: "acer",
  },
  {
    id: 6,
    label: "Asus",
    value: "asus",
  },
];

const processorList = [
  {
    id: 1,
    label: "Intel",
    value: "intel",
  },
  {
    id: 2,
    label: "AMD",
    value: "amd",
  },
  {
    id: 3,
    label: "Apple",
    value: "apple",
  },
  {
    id: 4,
    label: "Qualcomm",
    value: "qualcomm",
  },
  {
    id: 5,
    label: "Mediatek",
    value: "mediatek",
  },
  {
    id: 6,
    label: "Samsung",
    value: "samsung",
  },
];

const LaptopPostForm = ({ formik }) => {

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
      <Autocomplete
        id="brand"
        name="brand"
        label="Brand"
        options={brandList}
        value={formik.values.brand}
        onChange={(e, newValue) =>
          formik.setFieldValue("brand", newValue?.label || null)
        }
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
      <Autocomplete
        id="processor"
        name="processor"
        label="Processor"
        value={formik.values.processor}
        options={processorList}
        onChange={(e, newValue) =>
          formik.setFieldValue("processor", newValue?.label || null)
        }
        error={formik.touched.processor && Boolean(formik.errors.processor)}
        helperText={formik.touched.processor && formik.errors.processor}
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
        id="hdd"
        name="hdd"
        label="HDD"
        type="hdd"
        value={formik.values.hdd}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.hdd && Boolean(formik.errors.hdd)}
        helperText={formik.touched.hdd && formik.errors.hdd}
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

      <TextEditor
        placeholder="Description of the product"
        // value={formik.values.description}
        onChange={(e) => formik.setFieldValue("description", e.target.value)}
        name="description"
        helperText={formik.touched.description && formik.errors.description}
      />
    </Grid>
  );
};

export default LaptopPostForm;
