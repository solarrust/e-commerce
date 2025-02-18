import { create } from "zustand";
import { persist } from "zustand/middleware";

type Layout = {
  drawerOpen?: boolean;
};

const initialState: Layout = {
  drawerOpen: false,
};

export const layoutStore = create<Layout>()(
  persist(() => initialState, {
    name: "layoutStore",
  })
);

export default function useLayoutService() {
  const { drawerOpen } = layoutStore();
  return {
    drawerOpen,
    toggleDrawer: () => {
      layoutStore.setState({
        drawerOpen: !drawerOpen,
      });
    },
  };
}
