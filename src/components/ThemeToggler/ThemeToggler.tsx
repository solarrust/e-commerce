"use client";
import React, { ChangeEvent, useEffect } from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useColorScheme,
} from "@mui/material";

type ThemeMode = "system" | "light" | "dark";

export default function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setMode(localStorage.getItem("theme") as ThemeMode);
    }
  }, [setMode]);

  if (!mode) {
    return null;
  }

  function onModeChange(event: ChangeEvent<HTMLInputElement>) {
    setMode(event.target.value as ThemeMode);

    localStorage.setItem("theme", event.target.value);
  }

  return (
    <FormControl>
      <FormLabel id="theme-toggle">Theme</FormLabel>
      <RadioGroup
        name="theme-toggle"
        row
        value={mode}
        onChange={onModeChange}
      >
        <FormControlLabel
          value="light"
          control={<Radio />}
          label="Light"
        />
        <FormControlLabel
          value="dark"
          control={<Radio />}
          label="Dark"
        />
      </RadioGroup>
    </FormControl>
  );
}
