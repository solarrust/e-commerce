"use client";
import Link from "next/link";
import useSWR from "swr";

import { Order } from "@/lib/models/OrderModel";
import { formatDate } from "@/lib/utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Orders() {
  const { data: orders, error } = useSWR("/api/admin/orders");
  if (error) return "Failed to load orders";
  if (!orders) return "Loading...";

  return (
    <div>
      <h1>Orders</h1>
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="Admin orders table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">USER</TableCell>
              <TableCell align="right">DATE</TableCell>
              <TableCell align="right">TOTAL</TableCell>
              <TableCell align="right">PAID</TableCell>
              <TableCell align="right">DELIVERED</TableCell>
              <TableCell align="right">ACTION</TableCell>
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
                  ..{order._id.substring(20, 24)}
                </TableCell>
                <TableCell align="right">
                  {order.user?.name || "Deleted user"}
                </TableCell>
                <TableCell align="right">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell align="right">${order.totalPrice}</TableCell>
                <TableCell align="right">
                  {order.isPaid && order.paidAt
                    ? `${formatDate(order.paidAt)}`
                    : "not paid"}
                </TableCell>
                <TableCell align="right">
                  {order.isDelivered && order.deliveredAt
                    ? `${formatDate(order.deliveredAt)}`
                    : "not delivered"}
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
