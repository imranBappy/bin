"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Image, TextField, Typography } from "@/common";
import { Card } from "@mui/material";
import images from "@/assets/images";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CATEGORY_MUTATION } from "../graphql/mutation";
import toast from "react-hot-toast";
import { handleUploadMediaToBucket } from "@/utils/S3BucketApi";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_QUERY } from "../graphql/query";
import Loader from "@/common/Loader";

const page = () => {
  const [image, setImage] = useState({
    url: "",
    file: null,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const searchQuery = useSearchParams();
  const router = useRouter();

  const [createCategory, { loading: createCategoryLoading }] = useMutation(
    CATEGORY_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data);
        toast.success(data.categorySubCategoryCreateUpdate.message);
        setName("");
        setImage({
          url: "",
          file: null,
        });
        if ("Updated successfully.") {
          router.push("/dashboard/categories");
        }
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error adding category");
      },
    }
  );
  const [getCategory, { loading: getCategoryLoading }] = useLazyQuery(
    CATEGORY_QUERY,
    {
      variables: { id: searchQuery.get("id") },
      onCompleted: (data) => {
        const category = data?.category?.subCategories?.edges;
        if (category?.length === 0) {
          toast.error("Category not found");
        }
        setName(category[0]?.node?.name);
        setImage({
          url: category[0]?.node?.image,
          file: null,
        });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
    }
    setError("");
    const catId = searchQuery.get("id");
    if (catId) {
      createCategory({
        variables: {
          input: {
            id: catId,
            name: name,
            image: image.file
              ? await handleUploadMediaToBucket(image.file)
              : image.url,
            parent: "4",
          },
        },
      });

      return;
    }

    const imageUrl = await handleUploadMediaToBucket(image.file);
    if (!imageUrl) {
      toast.error("Error uploading image");
      return;
    }

    createCategory({
      variables: {
        input: {
          name: name,
          image: imageUrl,
          parent: "4",
        },
      },
    });
  };

  useEffect(() => {
    const catId = searchQuery.get("id");
    if (catId) {
      getCategory({
        variables: { id: catId },
      });
    }
  }, []);

  if (getCategoryLoading) return <Loader />;
  return (
    <Box my={8}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom py={2}>
          Add Category
        </Typography>

        <Card
          sx={{
            padding: "20px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="contained-button-file">
                <input
                  id="contained-button-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage({
                      url: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0],
                    });
                  }}
                  style={{ display: "none" }}
                />
                <Image
                  width={200}
                  height={200}
                  src={image.url || images.UPLOAD_PLACEHOLDER}
                  alt="category"
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </label>
            </Box>

            <TextField
              id="outlined-basic"
              label="Service Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={createCategoryLoading}
            >
              Add Service
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default page;
