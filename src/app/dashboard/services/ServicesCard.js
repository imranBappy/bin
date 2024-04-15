import { Typography, Box } from "@/common";
import { IconButton } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
const ServicesCard = ({
  title = "Laptop Finder",
  description = "Find Your Laptop Easily",
  Icon = ComputerIcon,
}) => {
  return (
    <IconButton
      sx={{
        flexGrow: 1,
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Box display={"flex"} gap={2} alignItems={"center"} width={"100%"}>
        <Icon
          sx={{
            fontSize: 25,
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "50%",
            padding: 2,
          }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          alignItems={"flex-start"}
        >
          <Typography variant={"h6"}>{title}</Typography>
          <Typography variant={"body2"}>{description}</Typography>
        </Box>
      </Box>
    </IconButton>
  );
};

export default ServicesCard;
