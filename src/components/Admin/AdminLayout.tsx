import React from "react";
import Link from "next/link";

import { auth } from "@/lib/auth";

const adminPages = ["dashboard", "orders", "products", "users"];

export default async function AdminLayout({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return (
      <div>
        <h1>Not authorized</h1>
        <p>Admin permission required</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {adminPages.map((page) => (
          <li key={page}>
            <Link
              href={`/admin/${page}`}
              className={activeItem === page ? "active" : ""}
            >
              {page.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>

      <div>{children}</div>
    </div>
  );
}
