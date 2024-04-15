"use client";
import { useState } from "react";
import { Box } from "@/common";
import CssBaseline from "@mui/material/CssBaseline";
import { DashboardNavbar, DashboardDrawer, DashboardContent } from "./index";

export default function Dashboard({ children, lang }) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardNavbar
        lang={lang}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <DashboardDrawer
        lang={lang}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <DashboardContent open={open}> {children}</DashboardContent>
    </Box>
  );
}
