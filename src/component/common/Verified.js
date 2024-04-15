"use client";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const Verified = () => {
  return (
    <Tooltip title="Verified">
      <IconButton>
        <VerifiedIcon
          sx={{
            color: "primary.main",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          tooltip="Verified"
        />
      </IconButton>
    </Tooltip>
  );
};

export default Verified;
