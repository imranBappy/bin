"use client";
import images from "@/assets/images";
import { Box, Button, Grid, Image, Typography } from "@/common";
import Verified from "@/component/common/Verified";

const ProfileCard = ({
  name,
  email,
  profileImage,
  verify,
  sellerStatus,
  loadingverify,
}) => {
  console.log(sellerStatus);
  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <Box
        boxShadow={2}
        p={3}
        sx={{
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "70px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Image
            src={profileImage || images.PROFILE_AVATAR}
            alt="profile"
            width={150}
            height={150}
            style={{
              borderRadius: "50%",
            }}
          />
          <Box
            mt={2}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <span>{name}</span>
              {sellerStatus === "verified-seller" && <Verified />}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                backgroundColor: "primary.light",
                borderRadius: "5px",
                paddingX: "30px",
                display: "inline-block",
                textAlign: "center",
                fontWeight: "semibold",
                marginY: "5px",
              }}
            >
              <span
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Admin
              </span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              {email}
            </Typography>
          </Box>
        </Box>
        <Button
          disabled={loadingverify || sellerStatus === "verified-seller"}
          variant={
            sellerStatus === "verified-seller" ? "contained" : "outlined"
          }
          color="primary"
          mt={2}
          sx={{
            width: "100%",
          }}
          onClick={verify}
        >
          {sellerStatus === "verified-seller" ? "Verified" : "Make Verified"}
        </Button>
      </Box>
    </Grid>
  );
};

export default ProfileCard;
