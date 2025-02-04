"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, ValidationRule } from "react-hook-form";

import useCartService from "@/lib/hooks/useCartStore";
import { ShippingAddress } from "@/lib/models/OrderModel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import CheckoutSteps from "../Checkout/CheckoutSteps";

import styles from "./Forms.module.css";

export default function ShippingForm() {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (
    form: ShippingAddress
  ) => {
    saveShippingAddress(form);
    router.push("/payment");
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className={styles.formGroup}>
      <TextField
        variant="outlined"
        fullWidth
        id={id}
        type="text"
        required={required}
        label={name}
        placeholder={name}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
      />
      {errors[id]?.message && (
        <p className={styles.formError}>{errors[id]?.message}</p>
      )}
    </div>
  );

  return (
    <>
      <CheckoutSteps current={1} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Shipping Address</h1>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className={styles.form}
        >
          <FormInput
            id="fullName"
            name="Full Name"
            required
          />
          <FormInput
            id="address"
            name="Address"
            required
          />
          <FormInput
            id="city"
            name="City"
            required
          />
          <FormInput
            id="postalCode"
            name="Postal Code"
            required
          />
          <FormInput
            id="country"
            name="Country"
            required
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className={styles.formButton}
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </Button>
        </form>
      </div>
    </>
  );
}
