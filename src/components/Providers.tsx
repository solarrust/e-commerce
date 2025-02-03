import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";

import ClientProviders from "./ClientProviders";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ClientProviders>{children}</ClientProviders>
    </SessionProvider>
  );
}
