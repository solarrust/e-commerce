"use client";
import useSWR from "swr";

import useLayoutService from "@/lib/hooks/useLayout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { drawerOpen, toggleDrawer } = useLayoutService();
  const { data: categories, error } = useSWR("/api/products/categories");

  if (error) return error.message;

  return (
    <Drawer
      open={drawerOpen}
      onClose={toggleDrawer}
    >
      <div className={styles.sidebar}>
        <h2>Shop by Department</h2>
        {!categories && <p>Loading...</p>}
        {categories && (
          <List>
            {categories.map((category: string) => (
              <ListItem
                key={category}
                disableGutters
              >
                <ListItemButton
                  href={`/search?category=${category}`}
                  onClick={() => toggleDrawer()}
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Drawer>
  );
}
