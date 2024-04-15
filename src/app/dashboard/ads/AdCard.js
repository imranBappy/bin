"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Image } from "@/common";
import Card from "@mui/material/Card";
import Images from "@/assets/images";
import { useMutation } from "@apollo/client";
import { handleUploadMediaToBucket } from "@/utils/S3BucketApi";
import { toast } from "react-hot-toast";
import BANNER_ADD_MUTATION from "../slider/graphql/mutation";
const AdCard = ({ id, link, refetch }) => {
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
            isAds: true,
            isActive: true,
          },
        },
      });
    } catch (error) {
      console.error(error);
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
          alt="Ad"
          width={400}
          height={500}
          style={{
            width: "350px",
            height: "500px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />

        <label
          htmlFor="contained-button-file"
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
              id="contained-button-file"
              style={{ display: "none" }}
              onChange={handleImpageUpload}
            />
          </Button>
        </label>
      </Box>
    </Card>
  );
};

export default AdCard;
