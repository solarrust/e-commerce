import React from "react";

import AdminLayout from "@/components/Admin/AdminLayout";
import Products from "@/components/Admin/Products";

export const metadata = {
  title: "Admin Products",
};
const AdminProductsPage = () => {
  return (
    <AdminLayout activeItem="products">
      <Products />
    </AdminLayout>
  );
};

export default AdminProductsPage;
