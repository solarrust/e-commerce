"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import useSWR from "swr";

import { Order } from "@/lib/models/OrderModel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function formatDate(dateString: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function MyOrders() {
  // const router = useRouter();
  const { data: orders, error } = useSWR("/api/orders/mine");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (error) return error.message;
  if (!orders) return "Loading...";

  return (
    <div className="wrapper">
      <h1>My Orders</h1>
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">DATE</TableCell>
              <TableCell align="right">TOTAL</TableCell>
              <TableCell align="right">PAID</TableCell>
              <TableCell align="right">DELIVERED</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {order._id.substring(20, 24)}
                </TableCell>
                <TableCell align="right">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell align="right">${order.totalPrice}</TableCell>
                <TableCell align="right">
                  {order.isPaid && order.paidAt
                    ? formatDate(order.paidAt)
                    : "Not Paid"}
                </TableCell>
                <TableCell align="right">
                  {order.isDelivered && order.deliveredAt
                    ? formatDate(order.deliveredAt)
                    : "Not delivered"}
                </TableCell>
                <TableCell align="right">
                  <Link
                    href={`/order/${order._id}`}
                    passHref
                  >
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
