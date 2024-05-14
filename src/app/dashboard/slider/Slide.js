"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Image } from "@/common";
import Card from "@mui/material/Card";
import Images from "@/assets/images";
import { useMutation } from "@apollo/client";
import BANNER_ADD_MUTATION from "./graphql/mutation";
import { handleUploadMediaToBucket } from "@/utils/S3BucketApi";
import { toast } from "react-hot-toast";

const Slide = ({ link, refetch, id }) => {
  const [slide, setSlide] = useState(null);
  useEffect(() => {
    setSlide(link);
  }, [link]);

  const [upload, { loading, error }] = useMutation(BANNER_ADD_MUTATION, {
    onCompleted: (data) => {
      toast.success("Image uploaded successfully");
      refetch();
    },
    onError: (error) => {
      toast.error("Error uploading image");
    },
  });

  const handleImpageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const link = await handleUploadMediaToBucket(file);
      await upload({
        variables: {
          input: {
            id: id,
            altText: "slider",
            link: link,
            isAds: false,
            isActive: true,
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Image
          src={slide || Images.UPLOAD_PLACEHOLDER}
          alt="slider"
          width={500}
          height={400}
          style={{
            width: "650px",
            height: "350px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />

        <label
          htmlFor={`contained-button-file-${id}`}
          style={{
            marginTop: "20px",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <Button variant="contained" component="span" disabled={loading}>
            Upload
            <input
              type="file"
              accept="image/*"
              id={`contained-button-file-${id}`}
              style={{ display: "none" }}
              onChange={handleImpageUpload}
            />
          </Button>
        </label>
      </Box>
    </Card>
  );
};

export default Slide;
