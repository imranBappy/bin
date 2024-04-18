import { Typography, Box, Image } from "@/common";
import { Card, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import images from "@/assets/images";
import Link from "next/link";

const CategoryCard = ({
  title = "Laptop Finder",
  numberOfProducts = 0,
  image,
  id,
}) => {
  return (
    <Card
      sx={{
        flexGrow: 1,
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Box
        display={"flex"}
        gap={2}
        alignItems={"center"}
        width={"100%"}
        sx={{
          position: "relative",
          "&:hover": {
            "& button": {
              display: "flex",
            },
          },
        }}
      >
        <IconButton
          sx={{
            display: "none",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
          color="primary"
        >
          <Link href={`/dashboard/categories/add?id=${id}`}>
            <EditIcon
              sx={{
                fontSize: 20,
                color: "#fff",
              }}
            />
          </Link>
        </IconButton>
        <Image
          src={image || images.UPLOAD_PLACEHOLDER}
          alt={title}
          width={70}
          height={70}
          style={{
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        />

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          alignItems={"flex-start"}
        >
          <Typography mt={-1} variant={"h6"}>
            {title}
          </Typography>
          <Typography variant={"body2"}>{numberOfProducts} Products</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CategoryCard;
