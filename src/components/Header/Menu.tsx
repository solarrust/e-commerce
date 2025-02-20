"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import useCartService from "@/lib/hooks/useCartStore";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import MenuMUI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./Header.module.css";

export default function Menu() {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const { data: session } = useSession();

  return (
    <div>
      <ul className={styles.headerList}>
        <li>
          {mounted && (
            <Badge
              badgeContent={items.reduce((a, c) => a + c.qty, 0)}
              color="primary"
            >
              <Link
                href="/cart"
                className={styles.button}
              >
                Cart
              </Link>
            </Badge>
          )}
        </li>
        {session && session.user ? (
          <li>
            <Button
              id="fade-button"
              variant="contained"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {session.user.name}
            </Button>
            <MenuMUI
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {session.user.isAdmin && (
                <MenuItem onClick={handleClose}>
                  <Link href="/admin/dashboard">Admin Dashboard</Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <Link href="/order-history">Order History</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={signoutHandler}>Log Out</MenuItem>
            </MenuMUI>
          </li>
        ) : (
          <Button
            variant="contained"
            className={styles.button}
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
      </ul>
    </div>
  );
}
