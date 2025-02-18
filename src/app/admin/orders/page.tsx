import React from "react";

import AdminLayout from "@/components/Admin/AdminLayout";
import Orders from "@/components/Admin/Orders";

export const metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = () => {
  return (
    <AdminLayout activeItem="orders">
      <Orders />
    </AdminLayout>
  );
};

export default AdminOrdersPage;
