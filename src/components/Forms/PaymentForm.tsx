"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import styles from "./Forms.module.css";

export default function PaymentForm() {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedMethod, setSelectedMethod] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    savePaymentMethod(selectedMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);
  
  return (
    <>
      <CheckoutSteps current={2} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Payment Method</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {["PayPal", "Stripe", "Cash"].map((method) => (
                <FormControlLabel
                  key={method}
                  value={method}
                  control={<Radio />}
                  label={method}
                  checked={selectedMethod === method}
                  onChange={() => setSelectedMethod(method)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div className={styles.formButtons}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              type="button"
              fullWidth
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className={styles.formButton}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
