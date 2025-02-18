import AdminLayout from "@/components/Admin/AdminLayout";
import Dashboard from "@/components/Admin/Dashboard";

export const metadata = {
  title: "Admin Dashboard",
};

const DashboardPage = () => {
  return (
    <AdminLayout activeItem="dashboard">
      <Dashboard />
    </AdminLayout>
  );
};

export default DashboardPage;
