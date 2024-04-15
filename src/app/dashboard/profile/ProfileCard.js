"use client";
import { Box, Button, Grid, Image, Typography } from "@/common";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const ProfileCard = ({ name, email, profileImage }) => {
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
            position: "relative",
            "&:hover": {
              cursor: "pointer",
            },
            "&:hover > .MuiSvgIcon-root": {
              display: "block",
            },
          }}
        >
          <BorderColorIcon
            sx={{
              fontSize: "25px",
              color: "primary.main",
              position: "absolute",
              top: "0",
              right: "0",
              display: "none",

              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
          <Image
            src="/assets/avatars/avatar-alcides-antonio.png"
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
          >
            <Typography variant="h5">{name}</Typography>
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
          variant="contained"
          color="primary"
          mt={2}
          sx={{
            width: "100%",
          }}
        >
          Logout
        </Button>
      </Box>
    </Grid>
  );
};

export default ProfileCard;
