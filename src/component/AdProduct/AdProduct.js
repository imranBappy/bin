"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { Container, Box, Typography, Grid } from "@/common";
import DefaultProductPostForm from "./DefaultProductPostForm";
import LaptopPostForm from "./LaptopPostForm";
import { laptopValidationSchema } from "./validationSchema";
import { productInitialValues } from "./productInitialValues";
import MobilePostForm from "./MobilePostForm";
import { useMutation } from "@apollo/client";
import { PRODUCT_MUTATION } from "./graphql/mutaton";

const AdProduct = () => {
  const [productCategory, setProductCategory] = useState("Laptop");
  //   photo state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const fileCountLimit = 5;

  const formik = useFormik({
    initialValues: productInitialValues,
    validationSchema: laptopValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const [
    postProduct,
    {
      loading: postProductLoading,
      error: postProductError,
      data: postProductData,
    },
  ] = useMutation(PRODUCT_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log({
    postProductLoading,
    postProductError,
    postProductData,
  });

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files.length + selectedFiles.length > fileCountLimit) {
      // slice the files to fit the limit
      const newFiles = Array.from(files).slice(
        0,
        fileCountLimit - selectedFiles.length
      );
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setFileError("You can only upload 5 photos");
    } else {
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };
  return (
    <Box mt={5}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h6" my={2}>
            Post Ad
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {productCategory === "Laptop" && (
                <LaptopPostForm formik={formik} />
              )}
              {productCategory === "Phone" && (
                <MobilePostForm formik={formik} />
              )}
              {productCategory === "Computer" && (
                <LaptopPostForm formik={formik} />
              )}
              <DefaultProductPostForm
                productCategoryState={[productCategory, setProductCategory]}
                formik={formik}
                selectedFiles={selectedFiles}
                fileError={fileError}
                fileCountLimit={fileCountLimit}
                handleFileSelect={handleFileSelect}
                handleRemoveFile={handleRemoveFile}
              />
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AdProduct;
