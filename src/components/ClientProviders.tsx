"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

import { cartStore } from "@/lib/hooks/useCartStore";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);

    return () => {
      document.removeEventListener("visibilitychange", updateStore);
      window.removeEventListener("focus", updateStore);
    };
  }, []);

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching the data.");
          }
          return res.json();
        },
      }}
    >
      <Toaster
        position="top-right"
      />
      {children}
    </SWRConfig>
  );
}
