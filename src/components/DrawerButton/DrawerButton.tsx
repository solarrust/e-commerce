"use client";
import React from "react";

import useLayoutService from "@/lib/hooks/useLayout";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function DrawerButton() {
  const { toggleDrawer } = useLayoutService();

  return (
    <Button
      onClick={toggleDrawer}
      color="inherit"
      aria-label="open drawer"
    >
      <MenuIcon aria-hidden="true" />
    </Button>
  );
}
