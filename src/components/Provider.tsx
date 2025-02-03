import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
