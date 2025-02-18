"use client";

import Link from "next/link";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import useSWR from "swr";

import { formatNumber } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR("/api/admin/orders/summary");

  if (error) return error.message;
  if (!summary) return "Loading...";

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: "rgb(53 162 235)",
        backgroundColor: "rgb(53 162 235 / 0.2)",
      },
    ],
  };

  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Orders",
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders
        ),
        borderColor: "rgb(53 162 235)",
        backgroundColor: "rgb(53 162 235 / 0.2)",
      },
    ],
  };

  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: "Category",
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          "rgb(255 99 132 / 0.2)",
          "rgb(54 162 235 / 0.2)",
          "rgb(255 206 86 / 0.2)",
          "rgb(75 192 192 / 0.2)",
          "rgb(153 102 255 / 0.2)",
          "rgb(255 159 64 / 0.2)",
        ],
        borderColor: [
          "rgb(255 99 132)",
          "rgb(54 162 235)",
          "rgb(255 206 86)",
          "rgb(75 192 192)",
          "rgb(153 102 255)",
          "rgb(255 159 64)",
        ],
      },
    ],
  };

  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: "Users",
        borderColor: "rgb(53 162 235)",
        backgroundColor: "rgb(53 162 235 / 0.5)",
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers
        ),
      },
    ],
  };

  return (
    <div className="wrapper">
      <ul>
        <li>
          <h3>Sales</h3>
          <p>${formatNumber(summary.ordersPrice)}</p>
          <Link href="/admin/orders">View Sales</Link>
        </li>
        <li>
          <h3>Orders</h3>
          <p>{summary.ordersCount}</p>
          <Link href="/admin/orders">View Orders</Link>
        </li>
        <li>
          <h3>Products</h3>
          <p>{summary.productsCount}</p>
          <Link href="/admin/products">View Products</Link>
        </li>
        <li>
          <h3>Users</h3>
          <p>{summary.usersCount}</p>
          <Link href="/admin/users">View Users</Link>
        </li>
      </ul>

      <div>
        <div>
          <h2>Sales Report</h2>
          <Line data={salesData} />
        </div>
        <div>
          <h2>Orders Report</h2>
          <Line data={ordersData} />
        </div>
        <div>
          <h2>Products Report</h2>
          <Doughnut data={productsData} />
        </div>
        <div>
          <h2>Users Report</h2>
          <Bar data={usersData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
