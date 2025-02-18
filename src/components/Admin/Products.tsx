"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Product } from "@/lib/models/ProductModel";
import { formatId } from "@/lib/utils";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Products() {
  const { data: products, error } = useSWR("/api/admin/products");
  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading("Deleting product...");
      const res = await fetch(`${url}/${arg.productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product deleted successfully", { id: toastId });
      } else {
        toast.error(data.message, { id: toastId });
      }
    }
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Product created successfully");
      router.push(`/admin/products/${data.product._id}`);
    }
  );

  if (error) return "An error occurred";
  if (!products) return "Loading...";

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Products</h1>
        <Button
          disabled={isCreating}
          onClick={() => createProduct()}
        >
          {isCreating ? "Creating..." : "Create Product"}
        </Button>
      </div>

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="Products table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">CATEGORY</TableCell>
              <TableCell align="right">COUNT IN STOCK</TableCell>
              <TableCell align="right">RATING</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {formatId(product._id!)}
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">${product.price}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.countInStock}</TableCell>
                <TableCell align="right">{product.rating}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() =>
                      router.push(`/admin/products/${product._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteProduct({ productId: product._id! })}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
